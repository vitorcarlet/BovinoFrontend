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

@Component({
  selector: 'app-animal-report',
  templateUrl: './animal-report.component.html',
  styleUrls: ['./animal-report.component.scss']
})
export class AnimalReportComponent implements OnInit {
  displayedColumns: string[] = ['date','paymentMethod','total','view']
  dataSource: any;
  responseMessage:any;
  constructor(
    
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router: Router,
    private animalService:AnimalService,
    private bovinoinfoService:BovinoInfoService,
    private reportService:ReportService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  handleGenerateReport(){
    
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
 
  
  

  
}
