import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from '../shared/model/song';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {
  public songForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SongFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { songToUpdate: Song | null }
  ) {
    this.songForm = this.formBuilder.group({
      id: [0], 
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[A-Za-z]+([\'.\\s]?[A-Za-z]+)*$')]],
      artist: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-Za-z][A-Za-z\\s]*$')]],
      lyrics: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.songToUpdate) {
      this.songForm.patchValue(this.data.songToUpdate);
    }
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.songForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  public onSubmit(): void {
    if (this.songForm.invalid) {
      this.songForm.markAllAsTouched();
      return;
    }

    const newSong: Song = this.songForm.value;
    this.dialogRef.close(newSong);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}

