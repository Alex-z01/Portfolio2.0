import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './components/blog-page/blog-page.component'; // Adjust the path as necessary
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog/:id', component: BlogPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
