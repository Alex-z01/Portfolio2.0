import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { Blog } from '../models/Blog';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = '/.netlify/functions/projects'; // Local or production Netlify function endpoint

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  getBlogByProjectId(projectId: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${projectId}/blog`);
  }
}
