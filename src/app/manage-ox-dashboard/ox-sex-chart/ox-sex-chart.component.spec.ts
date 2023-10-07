import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxSexChartComponent } from './ox-sex-chart.component';

describe('OxSexChartComponent', () => {
  let component: OxSexChartComponent;
  let fixture: ComponentFixture<OxSexChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OxSexChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OxSexChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
