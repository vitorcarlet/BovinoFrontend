import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnimalCardComponent } from './dialog-animal-card.component';

describe('DialogAnimalCardComponent', () => {
  let component: DialogAnimalCardComponent;
  let fixture: ComponentFixture<DialogAnimalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAnimalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAnimalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
