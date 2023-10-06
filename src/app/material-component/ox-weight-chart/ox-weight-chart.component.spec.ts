import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxWeightChartComponent } from './ox-weight-chart.component';

describe('OxWeightChartComponent', () => {
  let component: OxWeightChartComponent;
  let fixture: ComponentFixture<OxWeightChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxWeightChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OxWeightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
