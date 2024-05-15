import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceService } from 'src/app/services/blog-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, OnDestroy {
  blog: any;
  loading: boolean = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogServiceService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const projectId = params.get('id');
      if (projectId) {
        console.log("Loading Blog for projectId: " + projectId);
        this.blogService.getBlogByProjectId(+projectId).subscribe({
          next: (data) => {
            this.blog = data;
            console.log(this.blog);
            console.log(this.blog[0]);
            this.loading = false; // Set loading to false when data is received
          },
          error: (error) => {
            console.error('Failed to get blog data', error);
            this.loading = false; // Set loading to false even if there is an error
          }
        });
      } else {
        this.loading = false; // Set loading to false if no projectId is found
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

