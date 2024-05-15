import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list-component.component.html',
  styleUrls: ['./project-list-component.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (error: any) => console.error('There was an error!', error)
    });
  }

  onProjectClick(projectId: string): void {
    console.log(`Project clicked: ${projectId}`);
    // Additional code to handle the click event
  }
}
