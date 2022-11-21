import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BislatContainerComponent } from './features/bislat-container/bislat-container.component';
import { HeaderComponent } from './pages/header/header.component';
import { BislatInputComponent } from './features/bislat-input/bislat-input.component';
import { BislatOutputComponent } from './features/bislat-output/bislat-output.component';
import { BislatListComponent } from './features/bislat-list/bislat-list.component';
import { CourseComponent } from './pages/header/course/course.component';
import { HomepageComponent } from './pages/header/homepage/homepage.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { FavoritePageComponent } from './pages/header/favorite-page/favorite-page.component';
import { ManagementComponent } from './pages/header/management/management.component';
import { CourseSelectionComponent } from './pages/header/course-selection/course-selection.component';

import { SortCoursesService } from './services/sort-courses.service';
import { SafePipe } from './pipes/safe.pipe';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopBarComponent } from './features/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { SecretPageComponent } from './pages/header/course/secret-page/secret-page.component';
import { SortCycleComponent } from './pages/header/sort-cycle/sort-cycle.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular'
import { ApiCallsService } from './services/api-calls.service';
import { SecurityMsalService } from './services/security-msal.service';
import { BlockFormComponent } from './features/block-form/block-form.component';

export function MSAL_InctanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '4e3fe790-6226-4152-8ca8-e1c01bd31a6c',
      redirectUri: 'http://localhost:4200/secret/page'
    }
  })
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://index-bislat-back.azurewebsites.net/Iafbase/', ['api://4e3fe790-6226-4152-8ca8-e1c01bd31a6c/access_as_user']);
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}

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
    SortCycleComponent,
    BlockFormComponent
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
    BrowserAnimationsModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSAL_InctanceFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    SortCoursesService,
    ApiCallsService,
    SecurityMsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

