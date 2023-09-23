import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOxDashboardComponent } from './manage-ox-dashboard.component';

describe('ManageOxDashboardComponent', () => {
  let component: ManageOxDashboardComponent;
  let fixture: ComponentFixture<ManageOxDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOxDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOxDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
