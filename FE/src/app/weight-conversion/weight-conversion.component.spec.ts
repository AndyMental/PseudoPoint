import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightConversionComponent } from './weight-conversion.component';

describe('WeightConversionComponent', () => {
  let component: WeightConversionComponent;
  let fixture: ComponentFixture<WeightConversionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeightConversionComponent]
    });
    fixture = TestBed.createComponent(WeightConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
