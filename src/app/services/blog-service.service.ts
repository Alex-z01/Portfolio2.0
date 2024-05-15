import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  private apiUrl = '/.netlify/functions/blogs'; // Local or production Netlify function endpoint

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  getBlogByProjectId(projectId: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/project/${projectId}`);
  }
}
