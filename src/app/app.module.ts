import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BislatContainerComponent } from './features/bislat-container/bislat-container.component';
import { HeaderComponent } from './pages/header/header.component';
import { BislatInputComponent } from './features/bislat-container/bislat-input/bislat-input.component';
import { BislatOutputComponent } from './features/bislat-container/bislat-output/bislat-output.component';
import { BislatListComponent } from './features/bislat-container/bislat-list/bislat-list.component';
import { CourseComponent } from './pages/header/course/course.component';
import { HomepageComponent } from './pages/header/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { FavoritePageComponent } from './pages/header/favorite-page/favorite-page.component';
import { ManagementComponent } from './pages/header/management/management.component';
import { CourseSelectionComponent } from './pages/header/course-selection/course-selection.component';

import { SortCoursesService } from './features/bislat-container/sort-courses.service';
import { SafePipe } from './safe.pipe';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopBarComponent } from './features/bislat-container/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecretPageComponent } from './pages/header/course/secret-page/secret-page.component';
import { SortCycleComponent } from './pages/header/sort-cycle/sort-cycle.component';



@NgModule({
  declarations: [
    AppComponent,
    BislatContainerComponent,
    HeaderComponent,
    BislatInputComponent,
    BislatOutputComponent,
    BislatListComponent,
    CourseComponent,
    HomepageComponent,
    FavoritePageComponent,
    ManagementComponent,
    CourseSelectionComponent,
    SafePipe,
    TopBarComponent,
    SecretPageComponent,
    SortCycleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule
  ],
  providers: [SortCoursesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
