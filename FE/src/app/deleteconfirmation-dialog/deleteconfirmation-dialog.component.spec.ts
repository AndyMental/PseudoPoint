import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteconfirmationDialogComponent } from './deleteconfirmation-dialog.component';

describe('DeleteconfirmationDialogComponent', () => {
  let component: DeleteconfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteconfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteconfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteconfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
