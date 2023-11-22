import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AnimalService } from 'src/app/services/animal-service';
import { AnimalComponent } from '../animal/animal.component';
import {format} from 'date-fns'
import { UserService } from 'src/app/services/user.service';
import { BovinoInfoService } from 'src/app/services/bovino-info.service';

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
  userIdComponent:any;
  

  responseMessage:any;
  constructor(
  @Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder:FormBuilder,
  public dialogRef: MatDialogRef<AnimalComponent>,
  private snackbarService:SnackbarService,
  private animalService:AnimalService,
  private bovinoInfoService:BovinoInfoService
  ) { }

  ngOnInit(): void {
    this.obterOwnerId();
    this.animalForm = this.formBuilder.group({
      id: [''],
      name: [null, [Validators.required]],
      race: [null, [Validators.required]],
      birth: [null, [Validators.required]],
      actualWeight: [null, [Validators.required]],
      ownerIdId: ['']
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.animalForm.patchValue(this.dialogData.data);
      // Realize a conversão aqui e defina o valor formatado no controle do formulário
      this.unixTimestampToDateString(this.animalForm.controls.birth);
    } else {
      this.animalForm.patchValue(this.dialogData.data);
      // Realize a conversão aqui e defina o valor formatado no controle do formulário
      this.unixTimestampToDateString(this.animalForm.controls.birth);
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
      birth: formData.birth,
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

  unixTimestampToDateString(control: AbstractControl) {
    if (control.value) {
      const unixTimestamp = control.value;
      const date = new Date(unixTimestamp ); // Converta de segundos para milissegundos
      const formattedDate = format(date, 'yyyy-MM-dd');
      control.setValue(formattedDate);
    }
  }

  async obterOwnerId() {
    try {
      const value = await this.bovinoInfoService.getUserIdAsync();
      // O valor da Promise está disponível aqui
      console.log(value);
      this.userIdComponent = value;
    } catch (error) {
      // Trate erros, se houver
      console.error(error);
    }
  }
  
  

  edit(){
    var formData = this.animalForm.value;
    const getOwnerIdPromise = this.bovinoInfoService.getUserIdAsync();


    var data = {
      id: String(formData.id),
      name:formData.name,
      race: formData.race,
      birth: formData.birth,
      actualWeight: formData.actualWeight,
      ownerId: String(this.userIdComponent),
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
