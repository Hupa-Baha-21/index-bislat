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
    FavoritePageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
