import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildlifeComponent } from './wildlife.component';

describe('WildlifeComponent', () => {
  let component: WildlifeComponent;
  let fixture: ComponentFixture<WildlifeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WildlifeComponent]
    });
    fixture = TestBed.createComponent(WildlifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
