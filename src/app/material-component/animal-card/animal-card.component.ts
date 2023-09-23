import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../../interfaces/animal-interface'; // Ajuste o caminho para corresponder ao local real do arquivo
import { parseISO, differenceInMonths } from 'date-fns';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAnimalCardComponent } from '../dialog/dialog-animal-card/dialog-animal-card.component';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
})
export class AnimalCardComponent {
  @Input()
  animal: Animal | undefined;

  @Input()
  numero: number | undefined;

  responseMessage:any;

  constructor(private dialog:MatDialog,
    private router:Router){

  }



  converterDataEmIdadeEmMeses() {
    const dataNascimento = this.animal?.birthday;
    if(dataNascimento){
      const dataNascimentoDate = parseISO(dataNascimento);

      // Calcular a diferença em meses entre a data de nascimento e a data atual
      const dataAtual = new Date();
      const diferencaMeses = differenceInMonths(dataAtual, dataNascimentoDate);
      const diferencaMesesString: string | undefined = diferencaMeses.toString();
  
      console.log(`Idade em meses: ${diferencaMeses}`);

      return diferencaMesesString;
    }else{
      return GlobalConstants.genericError;
    }

    // Converter a data fornecida em um objeto de data
    }

    handleAddAction(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: 'Edit'
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(DialogAnimalCardComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
  
      });
  
    }
}
