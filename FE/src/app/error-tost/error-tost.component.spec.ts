import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorTostComponent } from './error-tost.component';

describe('ErrorTostComponent', () => {
  let component: ErrorTostComponent;
  let fixture: ComponentFixture<ErrorTostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorTostComponent]
    });
    fixture = TestBed.createComponent(ErrorTostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
