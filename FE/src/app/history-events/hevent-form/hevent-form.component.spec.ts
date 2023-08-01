import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeventFormComponent } from './hevent-form.component';

describe('HeventFormComponent', () => {
  let component: HeventFormComponent;
  let fixture: ComponentFixture<HeventFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeventFormComponent]
    });
    fixture = TestBed.createComponent(HeventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
