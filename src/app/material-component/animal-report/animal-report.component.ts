import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AnimalService } from 'src/app/services/animal-service';
import { BovinoInfoService } from 'src/app/services/bovino-info.service';
import { ReportService } from 'src/app/services/report.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import * as saveAs from 'file-saver';
import { UserService } from 'src/app/services/user.service';
import { Page } from 'src/app/interfaces/page-interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-animal-report',
  templateUrl: './animal-report.component.html',
  styleUrls: ['./animal-report.component.scss']
})
export class AnimalReportComponent implements OnInit {
  displayedColumns: string[] = ['date','paymentMethod','total','view']
  dataSource: any;
  responseMessage:any;
  page: Page;
  oxQuantity:any;
  oxAverageWeight:any;
  animalsArray: import("c:/Users/vitor/Desktop/PROJETOS/springboot/MeuBovinoApp/MeuBovinoApFront-End/angular/BovinoFrontend/src/app/interfaces/animal-interface").Animal[];
  constructor(
    
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router: Router,
    private animalService:AnimalService,
    private reportService:ReportService,
    private userService:UserService,
    private bovinoInfoService: BovinoInfoService

  ) { }

  

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    this.getAnimals();
    this.getOxQuantity();
    this.getOxMediumWeight();
  } 

  async getOxMediumWeight() {
    try {
      this.ngxService.start();
      const response = await this.bovinoInfoService.getOxMediumWeight();
      response.pipe(
        map((value: any) => {
          // Aqui, 'value' é o valor emitido pelo Observable
          // Você pode convertê-lo para uma string, se apropriado
          return JSON.stringify(value); // Isso irá converter 'value' em uma string JSON
        })
      ).subscribe((result: string) => {
        // 'result' é a string resultante após a transformação
        //console.log(result); // Faça algo com a string resultante
        this.oxAverageWeight= result;
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
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
  }

  async getOxQuantity() {
    try {
      this.ngxService.start();
      const response = await this.bovinoInfoService.getOxQuantity();
      response.pipe(
        map((value: any) => {
          // Aqui, 'value' é o valor emitido pelo Observable
          // Você pode convertê-lo para uma string, se apropriado
          return JSON.stringify(value); // Isso irá converter 'value' em uma string JSON
        })
      ).subscribe((result: string) => {
        // 'result' é a string resultante após a transformação
        //console.log(result); // Faça algo com a string resultante
        this.oxQuantity = result;
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
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
  }



  getAnimals() {
    try {
      const response = this.animalService.getAllAnimalsWithoutName(0, 10).subscribe((response: Page) => {
        console.log(response);
        this.page = response;
        this.animalsArray = this.page?.content;
      }, (error) => {
        console.error('Erro ao buscar os animais', error);
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleGenerateReport(){
    var data = {
      name: "Vitor Carlet",
      oxQuantity: this.oxQuantity,
      oxAverageWeight: this.oxAverageWeight,
      paymentMethod: "credit-card",
      totalAmount: "15.54",
      animalArray: JSON.stringify(this.animalsArray)
    };
    console.log(data);
    this.ngxService.start();
    this.reportService.generateReport(data).subscribe(
      (response: any) => {
        this.downloadFile2(response?.uuid);
        this.dataSource = [];
        this.tableData();
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  tableData(){
    this.reportService.getReports().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  handleDeleteAction(values:any){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete '+values.name + ' bill',
      confirmation:true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteReport(values.id);
      dialogRef.close();
    })
  }

  deleteReport(id:any){
    this.reportService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
   
    })
  }

  downloadReportAction(values:any){

    this.ngxService.start();
    var data = {
      name: values.name,
      email:values.email,
      uuid:values.uuid,
      contactNumber:values.contactNumber,
      paymentMethod:values.paymentMethod,
      totalAmount:values.total.toString(),
      productDetails:values.productDetail
    }
    this.downloadFile(values.uuid,data);
  }

  downloadFile(fileName:string,data:any){
    this.reportService.getPdf(data).subscribe((response)=>{
      saveAs(response,fileName+'.pdf')
      this.ngxService.stop();
    })
  }

  downloadFile2(fileName: string) {
    var data = {
      uuid: fileName
    }

    this.reportService.getPdf(data).subscribe((response)=>{
      saveAs(response,fileName + '.pdf');
      this.ngxService.stop();
    })
  }
 

  
}
