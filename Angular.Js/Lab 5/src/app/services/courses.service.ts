import { Injectable } from '@angular/core';
import { ICourse } from '../model/ICourse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${environment.apiUrl}/courses`);
  }

  getCourseByID(courseID: number | string): Observable<ICourse> {
    return this.http.get<ICourse>(`${environment.apiUrl}/courses/${courseID}`);
  }

  getCoursesByCategoryID(catID: number | string): Observable<ICourse[]> {
    if (catID === 0 || catID === '0') {
      return this.http.get<ICourse[]>(`${environment.apiUrl}/courses`);
    }
    return this.http.get<ICourse[]>(`${environment.apiUrl}/courses?catId=${catID}`);
  }

  addCourse(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(`${environment.apiUrl}/courses`, course);
  }

  updateCourse(courseID: number | string, course: ICourse): Observable<ICourse> {
    return this.http.put<ICourse>(`${environment.apiUrl}/courses/${courseID}`, course);
  }

  deleteCourse(courseID: number | string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/courses/${courseID}`);
  }
}
