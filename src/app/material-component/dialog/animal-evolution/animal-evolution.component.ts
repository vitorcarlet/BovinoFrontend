import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnimalEvolutionService } from 'src/app/services/animal-evolution-service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-animal-evolution',
  templateUrl: './animal-evolution.component.html',
  styleUrls: ['./animal-evolution.component.scss']
})
export class AnimalEvolutionComponent implements OnInit {
  onAddProcuct = new EventEmitter();
  onEditProcuct = new EventEmitter();
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
  ) { }

  ngOnInit(): void {
    this.evolutionForm = this.formBuilder.group({
      id: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      date: [null, [Validators.required]],
      weight: [null, [Validators.required]],

    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.evolutionForm.patchValue(this.dialogData.data);
    }
  
  }



}
