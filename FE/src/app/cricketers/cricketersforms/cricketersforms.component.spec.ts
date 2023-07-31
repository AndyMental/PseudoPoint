import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketersformsComponent } from './cricketersforms.component';

describe('CricketersformsComponent', () => {
  let component: CricketersformsComponent;
  let fixture: ComponentFixture<CricketersformsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CricketersformsComponent]
    });
    fixture = TestBed.createComponent(CricketersformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
