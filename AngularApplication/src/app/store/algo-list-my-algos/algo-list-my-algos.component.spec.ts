import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoListMyAlgosComponent } from './algo-list-my-algos.component';

describe('AlgoListMyAlgosComponent', () => {
  let component: AlgoListMyAlgosComponent;
  let fixture: ComponentFixture<AlgoListMyAlgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoListMyAlgosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoListMyAlgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
