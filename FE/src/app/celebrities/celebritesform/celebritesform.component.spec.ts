import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritesformComponent } from './celebritesform.component';

describe('CelebritesformComponent', () => {
  let component: CelebritesformComponent;
  let fixture: ComponentFixture<CelebritesformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CelebritesformComponent]
    });
    fixture = TestBed.createComponent(CelebritesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
