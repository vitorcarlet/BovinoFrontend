import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnimalTableComponent } from './manage-animal-table.component';

describe('ManageAnimalTableComponent', () => {
  let component: ManageAnimalTableComponent;
  let fixture: ComponentFixture<ManageAnimalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAnimalTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnimalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
