import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AnimalService } from 'src/app/services/animal-service';

@Component({
  selector: 'app-manage-animal-table',
  templateUrl: './manage-animal-table.component.html',
  styleUrls: ['./manage-animal-table.component.scss'],
})
export class ManageAnimalTableComponent implements OnInit {
  allAnimalsLoaded: boolean = false;

  constructor(
    public animalService: AnimalService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    // Inicie o serviço de carregamento aqui
    this.ngxService.start();

    // Carregue os animais
    this.loadAnimals();
  }

  loadAnimals() {
    // Suponhamos que você tenha uma função no seu serviço que carregue os animais
    this.animalService.runAnimals();
    
        this.allAnimalsLoaded = true;
        this.cardData(); }

  cardData() {
    if (this.allAnimalsLoaded) {
      // Pare o serviço de carregamento
      this.ngxService.stop();
    }
  }

}