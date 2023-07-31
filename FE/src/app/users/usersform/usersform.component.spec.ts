import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersformComponent } from './usersform.component';

describe('UsersformComponent', () => {
  let component: UsersformComponent;
  let fixture: ComponentFixture<UsersformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersformComponent]
    });
    fixture = TestBed.createComponent(UsersformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
