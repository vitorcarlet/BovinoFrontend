import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../category/category.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AnimalService } from 'src/app/services/animal-service';

@Component({
  selector: 'app-dialog-animal-card',
  templateUrl: './dialog-animal-card.component.html',
  styleUrls: ['./dialog-animal-card.component.scss']
})
export class DialogAnimalCardComponent implements OnInit {

  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  animalForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  

  responseMessage:any;
  constructor(
  @Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder:FormBuilder,
  private categoryService:CategoryService,
  public dialogRef: MatDialogRef<CategoryComponent>,
  private snackbarService:SnackbarService,
  private animalService:AnimalService
  ) { }

  ngOnInit(): void {
    this.animalForm = this.formBuilder.group({
      name:[null,[Validators.required]],
        race: [null, [Validators.required]],
      birth: [null, [Validators.required]],
      actualWeight: [null, Validators.required],
      ownerId: [null, Validators.required],
    });
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.dialogAction = "Edit"
      this.action = "Update";
      this.edit();

    }
  }

  edit(){
    var formData = this.animalForm.value;
    var data = {
      name:formData.name,
      race: formData.ra,
      birth: formData.birth,
      actualWeight: formData.actualWeight,
      ownerId: formData.ownerId,
    };

     this.animalService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddCategory.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");

    },(error:any)=>{
      this.dialogRef.close()
      console.error(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }


}
