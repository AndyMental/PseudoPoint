import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Song } from '../shared/model/song';
import { SongService } from '../shared/services/song.service';
import { SongFormComponent } from '../song-form/song-form.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ToastService,TOAST_STATE} from '../shared/services/toast.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  public songs: Song[] = [];
  public songToUpdate: Song | null = null;
  public errorMessage:string = '';

  constructor(private songService: SongService, private dialog: MatDialog , private toastservice:ToastService ) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  public loadSongs(): void {
    this.songService.getAllSongs().subscribe((songs) => {
      this.songs = songs;
    });
  }

  public openFormDialog(song: Song | null): void {
    const dialogRef = this.dialog.open(SongFormComponent, {
      width: '400px',
      data: { songToUpdate: song }
    });

    dialogRef.afterClosed().subscribe((result: Song | undefined) => {
      if (result) {
        if (song) {
          this.songService.updateSong(song.id!, result).subscribe((updatedSong) => {
            const index = this.songs.findIndex((s) => s.id === song.id);
            if (index !== -1) {
              this.songs[index] = updatedSong;
              this.loadSongs();
              this.toastservice.showToast(TOAST_STATE.success, 'Data Edited Successfully');
            }
          });
        } else {
          this.songService.createSong(result).subscribe((createdSong) => {
            this.songs.push(createdSong);
            this.loadSongs();
            this.toastservice.showToast(TOAST_STATE.success, 'Data added Successfully');
          });
        }
      }
    });
  }

  public onDeleteSong(song: Song): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this song?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.songService.deleteSong(song.id!).subscribe(() => {
          this.songs = this.songs.filter((s) => s.id !== song.id);
          this.loadSongs();
          this.toastservice.showToast(TOAST_STATE.success, 'Data deleted Successfully');
        });
      }
    });
  }
}


