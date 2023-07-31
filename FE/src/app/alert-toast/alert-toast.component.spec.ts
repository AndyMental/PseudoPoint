import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertToastComponent } from './alert-toast.component';

describe('AlertToastComponent', () => {
  let component: AlertToastComponent;
  let fixture: ComponentFixture<AlertToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertToastComponent]
    });
    fixture = TestBed.createComponent(AlertToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
