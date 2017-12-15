import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAlgoComponent } from './popup-algo.component';

describe('PopupAlgoComponent', () => {
  let component: PopupAlgoComponent;
  let fixture: ComponentFixture<PopupAlgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAlgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
