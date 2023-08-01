import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographyComponent } from './geography.component';

describe('GeographyComponent', () => {
  let component: GeographyComponent;
  let fixture: ComponentFixture<GeographyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeographyComponent]
    });
    fixture = TestBed.createComponent(GeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
