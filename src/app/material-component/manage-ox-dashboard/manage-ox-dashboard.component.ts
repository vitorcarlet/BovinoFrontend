import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BovinoInfoService } from 'src/app/services/bovino-info.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-ox-dashboard',
  templateUrl: './manage-ox-dashboard.component.html',
  styleUrls: ['./manage-ox-dashboard.component.scss']
})
export class ManageOxDashboardComponent implements OnInit {
responseMessage: any;
dataOxQuantity:any;
dataOxWeight:any;
getIdForm:any = FormGroup;
  

  constructor(
    private formBuilder:FormBuilder,
    private oxDashboardService: BovinoInfoService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackbarService
  ) {
    
   }

  ngOnInit(): void {
    this.ngxService.start();
    this.getOxQuantity();
    this.getOxMediumWeight();
  }

  /*async getOxQuantity() {
    try {
      this.ngxService.start();
      const response = await this.oxDashboardService.getOxQuantity();
      this.dataOxQuantity = response;
      this.ngxService.stop();
    } catch (error:any) {
      this.ngxService.stop();
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
  }*/

  async getOxQuantity() {
    try {
      this.ngxService.start();
      const response = await this.oxDashboardService.getOxQuantity();
      response.pipe(
        map((value: any) => {
          // Aqui, 'value' é o valor emitido pelo Observable
          // Você pode convertê-lo para uma string, se apropriado
          return JSON.stringify(value); // Isso irá converter 'value' em uma string JSON
        })
      ).subscribe((result: string) => {
        // 'result' é a string resultante após a transformação
        console.log(result); // Faça algo com a string resultante
        this.dataOxQuantity = result;
      });
     
      this.ngxService.stop();
    } catch (error:any) {
      this.ngxService.stop();
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
  }


  async getOxMediumWeight() {
    try {
      this.ngxService.start();
      const response = await this.oxDashboardService.getOxMediumWeight();
      response.pipe(
        map((value: any) => {
          // Aqui, 'value' é o valor emitido pelo Observable
          // Você pode convertê-lo para uma string, se apropriado
          return JSON.stringify(value); // Isso irá converter 'value' em uma string JSON
        })
      ).subscribe((result: string) => {
        // 'result' é a string resultante após a transformação
        console.log(result); // Faça algo com a string resultante
        this.dataOxWeight = result;
      });
     
      this.ngxService.stop();
    } catch (error:any) {
      this.ngxService.stop();
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
  }

  /*async getOxMediumWeight(){
    this.oxDashboardService.getOxMediumWeight().subscribe((response:any)=>{

      this.ngxService.stop();
      this.dataOxWeight = response;

    }, (error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    });
  }
*/
}
