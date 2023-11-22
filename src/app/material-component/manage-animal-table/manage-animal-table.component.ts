import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Animal } from 'src/app/interfaces/animal-interface';
import { AnimalService } from 'src/app/services/animal-service';
import { DialogAnimalCardComponent } from '../dialog/dialog-animal-card/dialog-animal-card.component';
import { BovinoInfoService } from 'src/app/services/bovino-info.service';
import { Page } from 'src/app/interfaces/page-interface';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import parse from 'node-html-parser';
import { AnimalPriceService } from 'src/app/services/animal-price.service';

@Component({
  selector: 'app-manage-animal-table',
  templateUrl: './manage-animal-table.component.html',
  styleUrls: ['./manage-animal-table.component.scss'],
})
export class ManageAnimalTableComponent implements OnInit {
  allAnimalsLoaded: boolean = false;
  filterValue: string = '';
  filteredAnimals?: Page ;
  price: any | undefined;
  priceJson: any | undefined;
  currentPage: number = 0; // Página atual
  pageSize: number = 4; // Tamanho da página
  page:Page;

  constructor(
    public animalService: AnimalService,
    public animalPrice: AnimalPriceService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private router: Router,
    private bovinoInfo: BovinoInfoService,
    private ngZone: NgZone
  ) {
    this.ngxService.start();
    this.filteredAnimals = null;
  }

  ngOnInit(): void {
    this.getPrice();
    this.loadAnimals(this.currentPage, this.pageSize, this.filterValue);
  }

  async getPriceDay() {
    const dataAtual = new Date();

    console.log('tentando achar um valor para pricejson');
    this.priceJson = await this.animalPrice.getLastPrice();
    const lastGetDate = new Date(this.priceJson.dia);

    const actualDay = dataAtual.getDate();
    const actualMonth = dataAtual.getMonth() + 1; // +1 porque o mês começa em 0 (janeiro)
    const actualYear = dataAtual.getFullYear();

    const lastDay = lastGetDate.getDate();
    const lastMonth = lastGetDate.getMonth() + 1;
    const lastYear = lastGetDate.getFullYear();

    console.log(`Data atual: ${actualDay}/${actualMonth}/${actualYear}`);
    console.log(`Data do último preço: ${lastDay}/${lastMonth}/${lastYear}`);

    return (
      actualDay !== lastDay ||
      actualMonth !== lastMonth ||
      actualYear !== lastYear
    );
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addPriceDay(price: any) {
    console.log('dentro do addPriceday');
    const dataJson = {
      price: price,
      date: this.getCurrentDate(),
    };
    this.animalPrice.addPrice(dataJson);
  }

  async getPrice() {
    console.log('iniciando getPrice');
    if (await this.getPriceDay()) {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const response = await fetch(
        proxyUrl + 'https://www.melhorcambio.com/boi-hoje'
      );
      const text = await response.text();
      const terms = parse(text);
      const comercial = terms.querySelector('#comercial');
      const price = comercial.attributes.value;
      const parsedPrice = parseInt(price, 10);
      this.price = parsedPrice;
      this.addPriceDay(parsedPrice);
      console.log('foi feito request para servidor do melhorcambio');
    } else {
      this.priceJson = await this.animalPrice.getLastPrice();
      console.log(this.priceJson.valor);
      this.price = this.priceJson.valor;
      console.log('NÃO foi feito request para servidor do melhorcambio');
    }
  }

  

  handleAddAction() {
    this.bovinoInfo
      .getUserId()
      .then((userId) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          action: 'Add',
          data: userId,
        };
        dialogConfig.width = '850px';
        const dialogRef = this.dialog.open(
          DialogAnimalCardComponent,
          dialogConfig
        );
        this.router.events.subscribe(() => {
          dialogRef.close();
        });

        const sub = dialogRef.componentInstance.onAddAnimal.subscribe(
          (response) => {
            this.loadAnimals(this.currentPage, this.pageSize, this.filterValue);
          }
        );
      })
      .catch((error) => {
        console.error('Erro ao obter o ID do usuário:', error);
      });
  }

  onSearch() {
    // Atualize a lista de animais com base no valor da caixa de pesquisa
    this.currentPage = 0; // Reinicie para a primeira página
    this.loadAnimals(this.currentPage, this.pageSize, this.filterValue);
  }

  loadAnimals(currentPage: number, pageSize: number, searchName: string) {
    try {
      // Suponhamos que você tenha uma função no seu serviço que carregue os animais
      const response = this.animalService.getAllAnimals(currentPage, pageSize, searchName).subscribe((response: Page) => {
        console.log(response);
        this.page = response;
        this.filteredAnimals = this.page;
      console.log(this.filteredAnimals+'filteredanimals');
      this.allAnimalsLoaded = true;
      this.cardData();
      }, (error) => {
        console.error('Erro ao buscar os animais', error);
      });
      
    } catch (error) {
      console.error(error);
    }
  }
  

  isFilteredAnimalsDefined(filteredAnimals: Page | undefined): boolean {
    return filteredAnimals !== undefined && filteredAnimals !== null;
  }

  changePage(page: number) {
    event.preventDefault(); 
  
    if (!this.filteredAnimals) {
      throw new Error("The `filteredAnimals` property is undefined.");
    }
  
    // Ajuste a página para a correspondência correta entre o serviço e o aplicativo
    
    console.log(page);
    if (
      this.filteredAnimals &&
      page >= 0 &&
      page < this.filteredAnimals.totalPages
    ) {
      this.currentPage = page;
      this.loadAnimals(page, this.pageSize, this.filterValue);
    }
  }

  generatePageNumbers(totalPages: number) {
    if (this.filteredAnimals ??  false) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [];
  }

  cardData() {
    if (this.allAnimalsLoaded) {
      // Pare o serviço de carregamento
      this.ngxService.stop();
      //console.log('passou');

      // No carregamento inicial, mostre todos os animais
    }
  }
}
