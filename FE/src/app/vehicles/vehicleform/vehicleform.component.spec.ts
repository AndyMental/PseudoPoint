import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleformComponent } from './vehicleform.component';

describe('VehicleformComponent', () => {
  let component: VehicleformComponent;
  let fixture: ComponentFixture<VehicleformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleformComponent]
    });
    fixture = TestBed.createComponent(VehicleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
