import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  private apiUrl = '/.netlify/functions'; // Local or production Netlify function endpoint

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/blogs`);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/blogById?id=${id}`);
  }

  getBlogByProjectId(projectId: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/blogByProjectId?projectId=${projectId}`);
  }
}
