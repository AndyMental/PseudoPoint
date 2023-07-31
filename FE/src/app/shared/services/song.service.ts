// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Song } from '../model/song';

// @Injectable({
//   providedIn: 'root'
// })
// export class SongService {
//   private baseUrl = 'http://localhost:8000/songs'; // Replace this with your API endpoint base URL

//   constructor(private http: HttpClient) { }

//   getAllSongs(): Observable<Song[]> {
//     console.log('Fetching all songs...');
//     return this.http.get<Song[]>(`${this.baseUrl}/`);
//   }

//   getSongByTitle(title: string): Observable<Song> {
//     return this.http.get<Song>(`${this.baseUrl}/${title}`);
//   }

//   createSong(song: Song): Observable<Song> {
//     return this.http.post<Song>(`${this.baseUrl}/new_song`, song);
//   }

//   updateSong(title: string, song: Song): Observable<Song> {
//     return this.http.put<Song>(`${this.baseUrl}/${title}`, song);
//   }

//   deleteSong(title: string): Observable<Song> {
//     return this.http.delete<Song>(`${this.baseUrl}/${title}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private baseUrl = 'http://localhost:8000/songs'; // Replace this with your API endpoint base URL

  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<Song[]> {
    console.log('Fetching all songs...');
    return this.http.get<Song[]>(this.baseUrl);
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.baseUrl}/${id}`);
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.baseUrl, song);
  }

  updateSong(songId: number, song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.baseUrl}/${songId}`, song);
  }

  deleteSong(songId: number): Observable<Song> {
    return this.http.delete<Song>(`${this.baseUrl}/${songId}`);
  }
}
