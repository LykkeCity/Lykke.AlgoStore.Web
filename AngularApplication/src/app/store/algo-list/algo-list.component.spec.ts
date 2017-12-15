import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoListComponent } from './algo-list.component';

describe('AlgoListComponent', () => {
  let component: AlgoListComponent;
  let fixture: ComponentFixture<AlgoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
