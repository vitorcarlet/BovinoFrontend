import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAnimalsAddedComponent } from './last-animals-added.component';

describe('LastAnimalsAddedComponent', () => {
  let component: LastAnimalsAddedComponent;
  let fixture: ComponentFixture<LastAnimalsAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastAnimalsAddedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAnimalsAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
