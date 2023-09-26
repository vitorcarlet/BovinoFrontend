import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouAreNotAllowedComponent } from './you-are-not-allowed.component';

describe('YouAreNotAllowedComponent', () => {
  let component: YouAreNotAllowedComponent;
  let fixture: ComponentFixture<YouAreNotAllowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouAreNotAllowedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouAreNotAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
