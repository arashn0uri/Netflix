import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { HeaderComponent } from './components/header/header.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FilmManagerComponent } from './components/Film-manager/film-manager.component';
import { ActorsComponent } from './components/actors/actors.component';
import { GenresComponent } from './components/genres/genres.component';
import { ActorManagerComponent } from './components/actor-manager/actor-manager.component';
import { GenreManagerComponent } from './components/genre-manager/genre-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    FilmListComponent,
    HeaderComponent,
    ResetPasswordComponent,
    DashboardComponent,
    FilmDetailsComponent,
    ProfileComponent,
    FilmManagerComponent,
    ActorsComponent,
    GenresComponent,
    ActorManagerComponent,
    GenreManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgxLocalStorageModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
