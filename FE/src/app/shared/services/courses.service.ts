import { HttpClient } from '@angular/common/http';
import {CoursesModel} from '../model/courses';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) { 
    
  }

getCourses() : Observable<CoursesModel[]>{
  return this.http.get<CoursesModel[]>('http://127.0.0.1:8000/courses/');
  
} 

deleteCourse(course_id: number): Observable<CoursesModel[]> {
  const url = `http://127.0.0.1:8000/courses/${course_id}`;
  return this.http.delete<CoursesModel[]>(url);
}

addCourse(course: CoursesModel): Observable<CoursesModel> {
  const url = `http://127.0.0.1:8000/courses/`;
  return this.http.post<CoursesModel>(url, course);
}

updateCourse(course: CoursesModel): Observable<CoursesModel> {
  console.log("rdtyyuio")
  const url = `http://127.0.0.1:8000/courses/${course.course_id}`;
  return this.http.put<CoursesModel>(url, course);
}
}
