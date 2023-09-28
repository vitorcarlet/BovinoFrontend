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

  onAddAnimal = new EventEmitter();
  onEditAnimal = new EventEmitter();
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
      id: [''],
      name:[null,[Validators.required]],
        race: [null, [Validators.required]],
        birthday: [null, [Validators.required]],
      actualWeight: [null, [Validators.required]],
      ownerIdId: ['']
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.animalForm.patchValue(this.dialogData.data);
    }else{
      this.animalForm.patchValue(this.dialogData.data);
    }

  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.dialogAction = "Edit"
      this.action = "Update";
      this.edit();
    }else{
      this.add();
    }
  }

  add() {
    console.log(this.dialogData.data);
    var userId = this.dialogData.data;
    var formData = this.animalForm.value;
    console.log(userId.id+"  "+formData.name+"  "+formData.race+"add do animalcard");
    var data = {
      name:formData.name,
      race: formData.race,
      birth: formData.birthday,
      actualWeight: formData.actualWeight,
      ownerId: String(userId)
    };

    this.animalService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddAnimal.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
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

  edit(){
    var formData = this.animalForm.value;
    var data = {
      id: String(formData.id),
      name:formData.name,
      race: formData.race,
      birth: formData.birthday,
      actualWeight: formData.actualWeight,
      ownerId: String(formData.ownerIdId),
    };

    console.log(data);

     this.animalService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      //this.onAddCategory.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
      location.reload();

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
