import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationData } from '../model/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiUrl = 'http://127.0.0.1:8000/notifications';

  constructor(private http: HttpClient) {}

  createNotification(notificationData: NotificationData): Observable<NotificationData> {
    return this.http.post<NotificationData>(this.apiUrl, notificationData);
  }

  getNotificationData(): Observable<NotificationData[]> {
    return this.http.get<NotificationData[]>(this.apiUrl);
  }

  deleteNotification(notificationId: number): Observable<void> {
    const url = `${this.apiUrl}/${notificationId}`;
    return this.http.delete<void>(url);
  }

  updateNotification(updatedData: NotificationData): Observable<NotificationData> {
    const id = updatedData.id;
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<NotificationData>(url, updatedData);
  }
} 