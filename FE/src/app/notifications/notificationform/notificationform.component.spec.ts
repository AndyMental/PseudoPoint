import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationformComponent } from './notificationform.component';

describe('NotificationformComponent', () => {
  let component: NotificationformComponent;
  let fixture: ComponentFixture<NotificationformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationformComponent]
    });
    fixture = TestBed.createComponent(NotificationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
