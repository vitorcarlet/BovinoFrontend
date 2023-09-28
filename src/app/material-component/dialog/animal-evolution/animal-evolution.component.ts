import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnimalEvolutionService } from 'src/app/services/animal-evolution-service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-animal-evolution',
  templateUrl: './animal-evolution.component.html',
  styleUrls: ['./animal-evolution.component.scss'],
})
export class AnimalEvolutionComponent implements OnInit {
  onAddEvolution = new EventEmitter();
  onEditEvolution  = new EventEmitter();
  evolutionForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  categories: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private animalEvolutionService: AnimalEvolutionService,
    public dialogRef: MatDialogRef<AnimalEvolutionComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.evolutionForm = this.formBuilder.group({
      id: [null],
      registryDateString: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      animalId:[null]
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.evolutionForm.patchValue(this.dialogData.data);
    }
    if (this.dialogData.action === 'Add') {
      this.dialogAction = 'Add';
      this.action = 'Adding';
      this.evolutionForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.edit();
    }
    if(this.dialogAction === 'Add'){
      this.dialogAction = 'Add';
      this.action = 'Adding';
      this.add();
    }
  }

  add() {
    console.log(this.dialogData.data);
    var fromAnimal = this.dialogData.data;
    var formData = this.evolutionForm.value;
    console.log(fromAnimal.id+"  "+formData.weight+"  "+formData.registryDateString+"add do animalevolution");
    var data = {
      id: fromAnimal.id,
      weight: formData.weight,
      date: formData.registryDateString,
    };

    this.animalEvolutionService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddEvolution.emit();
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

  edit() {
    var formData = this.evolutionForm.value;
    var data = {
      id: formData.id,
      date: formData.registryDateString,
      weight: formData.weight
    };

    console.log(data);

    this.animalEvolutionService.edit(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditEvolution.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
        //location.reload();
      },
      (error: any) => {
        this.dialogRef.close();
        console.error(error);
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
}
