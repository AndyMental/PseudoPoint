import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oauth1formComponent } from './oauth1form.component';

describe('Oauth1formComponent', () => {
  let component: Oauth1formComponent;
  let fixture: ComponentFixture<Oauth1formComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Oauth1formComponent]
    });
    fixture = TestBed.createComponent(Oauth1formComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
