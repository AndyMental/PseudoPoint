import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWeightComponent } from './form-weight.component';

describe('FormWeightComponent', () => {
  let component: FormWeightComponent;
  let fixture: ComponentFixture<FormWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormWeightComponent]
    });
    fixture = TestBed.createComponent(FormWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
