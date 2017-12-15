import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoEditComponent } from './algo-edit.component';

describe('AlgoEditComponent', () => {
  let component: AlgoEditComponent;
  let fixture: ComponentFixture<AlgoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
