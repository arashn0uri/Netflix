import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddFilmComponent } from './components/film/add-film.component';
import { ActorsComponent } from './components/actors/actors.component';
import { GenresComponent } from './components/genres/genres.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'films', component: FilmListComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'filmDetails/:filmTitle', component: FilmDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-film', component: AddFilmComponent },
  { path: 'actors', component: ActorsComponent },
  { path: 'genres', component: GenresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
