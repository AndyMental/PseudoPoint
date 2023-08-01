import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersData } from '../model/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your FastAPI backend URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersData[]> {
    return this.http.get<UsersData[]>(`${this.apiUrl}/users/`);
  }

  createUser(user: UsersData): Observable<UsersData> {
    return this.http.post<UsersData>(`${this.apiUrl}/users/`, user);
  }

  updateUser(user: UsersData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }
}
