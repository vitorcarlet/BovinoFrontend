import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialBovinoComponent } from './initial-bovino.component';

describe('InitialBovinoComponent', () => {
  let component: InitialBovinoComponent;
  let fixture: ComponentFixture<InitialBovinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialBovinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialBovinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
