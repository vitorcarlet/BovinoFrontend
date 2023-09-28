import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../../interfaces/animal-interface'; // Ajuste o caminho para corresponder ao local real do arquivo
import { parseISO, differenceInMonths } from 'date-fns';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAnimalCardComponent } from '../dialog/dialog-animal-card/dialog-animal-card.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { AnimalService } from 'src/app/services/animal-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { BovinoInfoService } from 'src/app/services/bovino-info.service';

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
    private router:Router,
    private animalService:AnimalService,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService,
    private bovinoInfo:BovinoInfoService){

  }



  converterDataEmIdadeEmMeses() {
    const dataNascimento = this.animal?.birthday;
    if(dataNascimento){
      const dataNascimentoDate = parseISO(dataNascimento);

      // Calcular a diferença em meses entre a data de nascimento e a data atual
      const dataAtual = new Date();
      const diferencaMeses = differenceInMonths(dataAtual, dataNascimentoDate);
      const diferencaMesesString: string | undefined = diferencaMeses.toString();
  
      //console.log(`Idade em meses: ${diferencaMeses}`);

      return diferencaMesesString;
    }else{
      return GlobalConstants.genericError;
    }

    // Converter a data fornecida em um objeto de data
    }

  

    handleDeleteAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'delete '+values.name+' ',
        confirmation:true
      }
      const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
      const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
        this.ngxService.start();
        this.deleteProduct(values);
        dialogRef.close();
      })
    }

    async deleteProduct(animal:any){
       (await this.animalService.deleteAnimal(animal)).subscribe((response:any)=>{
        this.ngxService.stop();
        //this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage,"success");
        location.reload();
      },(error:any)=>{
        this.ngxService.stop();
        console.log(error.error?.message);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }else{
          this.responseMessage = GlobalConstants.genericError;
          this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
        }
      })
    }

    handleEditAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: 'Edit',
        data:values
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(DialogAnimalCardComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
  
      });
  
    }

    handleEvolutionAction(animalObj: any) {
      this.router.navigate(['/cafe/animalEvolution'], {
        queryParams: { animalData: JSON.stringify(animalObj) }
      });
    }
  
}
