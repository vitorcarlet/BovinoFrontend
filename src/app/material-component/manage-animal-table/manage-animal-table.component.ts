import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Animal } from 'src/app/interfaces/animal-interface';
import { AnimalService } from 'src/app/services/animal-service';
import { DialogAnimalCardComponent } from '../dialog/dialog-animal-card/dialog-animal-card.component';
import { BovinoInfoService } from 'src/app/services/bovino-info.service';
import { Page } from 'src/app/interfaces/page-interface';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-manage-animal-table',
  templateUrl: './manage-animal-table.component.html',
  styleUrls: ['./manage-animal-table.component.scss'],
})
export class ManageAnimalTableComponent implements OnInit {
  allAnimalsLoaded: boolean = false;
  filterValue: string = '';
  filteredAnimals:Page | undefined ;

  
  

  constructor(
    public animalService: AnimalService,
    private ngxService: NgxUiLoaderService,
    private dialog:MatDialog,
    private router:Router,
    private bovinoInfo:BovinoInfoService,
    private ngZone:NgZone
  ) {
    
    this.ngxService.start();
    this.loadAnimals();
    
  }

  ngOnInit(): void {
    
  }

  handleAddAction(){
    this.bovinoInfo.getUserId().then(userId =>{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
      data: userId
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(DialogAnimalCardComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddAnimal.subscribe((response)=>{
      this.loadAnimals();
    })
  }).catch(error =>{
    console.error("Erro ao obter o ID do usuário:", error);
  });
  

}

    

  // applyFilter(event: Event) {
  //   this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

  //   // Verifique se o filtro está vazio
  //   if (this.filterValue === '') {
  //     // Se o filtro estiver vazio, mostre todos os animais
  //     this.filteredAnimals = this.animalService.animals;
  //   } else {
  //     // Caso contrário, aplique o filtro
  //     this.filteredAnimals = this.animalService.animals.filter(animal => {
  //       return animal.name.toLowerCase().includes(this.filterValue);
  //     });
  //   }
  // }

  // loadAnimalsOutsideAngular() {
  //   this.ngZone.runOutsideAngular(() => {
  //     // Suponhamos que você tenha uma função no seu serviço que carregue os animais
  //     this.animalService.getAllAnimals().then(() => {
  //       this.filteredAnimals = this.animalService.page;
  //       console.log(this.filteredAnimals);
  //       this.allAnimalsLoaded = true;
  //       this.cardData();
  
  //       // Quando os objetos estiverem carregados, execute a zona Angular novamente
  //       this.ngZone.run(() => {
  //         this.ngxService.stop();
  //       });
  //     });
  //   });
  // }
  


  loadAnimals() {
    // Suponhamos que você tenha uma função no seu serviço que carregue os animais
    this.animalService.getAllAnimals().then(() => {

      this.filteredAnimals = this.animalService.page;
      console.log(this.filteredAnimals);
      this.allAnimalsLoaded = true;
      this.cardData();
    })

      };
     
  


  // loadAnimals2() {
  //   // Suponhamos que você tenha uma função no seu serviço que carregue os animais
  //   this.animalService.runAnimals().then(() => {
  //     console.log("Animais carregados:", this.animalService.animals);
  
  //     // Agora, você pode popular filteredAnimals após o carregamento dos dados
  //     this.filteredAnimals = this.animalService.animals;
  //     console.log("Animais carregados:", this.filteredAnimals);
  //     this.allAnimalsLoaded = true;
  //     this.cardData();
  //   });
  // }

  cardData() {
    if (this.allAnimalsLoaded) {
      // Pare o serviço de carregamento
      this.ngxService.stop();
      console.log("passou");

      // No carregamento inicial, mostre todos os animais
      
    }
  }

}