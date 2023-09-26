import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AnimalEvolutionService } from 'src/app/services/animal-evolution-service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { AnimalEvolutionComponent } from '../dialog/animal-evolution/animal-evolution.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-animal-evolution',
  templateUrl: './manage-animal-evolution.component.html',
  styleUrls: ['./manage-animal-evolution.component.scss']
})
export class ManageAnimalEvolutionComponent implements OnInit {

  animal:any;
  dataSource:any;
  responseMessage:any;
  displayedColumns: string[] = ['registryDateString','weight','options'];

  constructor(private route: ActivatedRoute,
    private animalEvolutionService:AnimalEvolutionService,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService,
    private dialog:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['animalData']) {
        const animal = JSON.parse(params['animalData']);
        this.animal = animal;
      }
    });
    this.getAllEvolutions();
  }

  getAllEvolutions(){
      let animalName = this.animal.name;
      this.ngxService.start();
      this.evolutions(animalName)
  }

  evolutions(animalName:any){
    this.animalEvolutionService.getEvolutions(animalName).subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })

  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(AnimalEvolutionComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    });

    // const sub = dialogRef.componentInstance.onAddEvolution.subscribe((response)=>{
    //   this.getAllEvolutions();
    // })
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(AnimalEvolutionComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    });

    // const sub = dialogRef.componentInstance.onEditEvolution.subscribe((response)=>{
    //   this.getAllEvolutions();
    // })
  }
  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete '+values.name+' product',
      confirmation:true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }

  deleteProduct(id:any){
    this.animalEvolutionService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.getAllEvolutions();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
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

}
