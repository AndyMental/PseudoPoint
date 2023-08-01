import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoFormComponent } from './geo-form.component';

describe('GeoFormComponent', () => {
  let component: GeoFormComponent;
  let fixture: ComponentFixture<GeoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeoFormComponent]
    });
    fixture = TestBed.createComponent(GeoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
