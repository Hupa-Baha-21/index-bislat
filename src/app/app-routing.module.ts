import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './pages/header/course/course.component';
import { HomepageComponent } from './pages/header/homepage/homepage.component';
import { FavoritePageComponent } from './pages/header/favorite-page/favorite-page.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'homePage', component: HomepageComponent},
  { path: 'course/:number', component: CourseComponent },
  {path: 'favorite', component: FavoritePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
