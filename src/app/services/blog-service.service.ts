import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  private apiUrl = 'http://localhost:3000/api/blogs/';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  getBlogByProjectId(projectId: number): Observable<Blog> {
    console.log(`${this.apiUrl}project/${projectId}`);
    return this.http.get<Blog>(`${this.apiUrl}project/${projectId}`);
  }
}
