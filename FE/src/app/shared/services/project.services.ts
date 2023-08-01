import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geolocation } from '../model/geolocation.moel';
import { ProjectInterface } from '../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
 public getProjects(): Observable<ProjectInterface[]> {
    return this.http.get<ProjectInterface[]>('http://127.0.0.1:8000/projects');
  }

  public deleteProject(id: number): Observable<ProjectInterface[]> {
    const url = `http://127.0.0.1:8000/projects/${id}`;
    return this.http.delete<ProjectInterface[]>(url);
  }

 public addProject(newProj: ProjectInterface): Observable<ProjectInterface> {
    console.log(newProj);
    const url = `http://127.0.0.1:8000/projects`;
    return this.http.post<ProjectInterface>(url, newProj);
  }

 public updateProject(id: number, record: ProjectInterface): Observable<ProjectInterface> {
    const url = `http://127.0.0.1:8000/projects/${id}`;
    return this.http.put<ProjectInterface>(url, record);
  }
}
