import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddFilmComponent } from './components/add-film/add-film.component';
import { ActorsComponent } from './components/actors/actors.component';
import { GenresComponent } from './components/genres/genres.component';
import { AddGenreComponent } from './components/add-genre/add-genre.component';
import { ActorManagerComponent } from './components/actor-manager/actor-manager.component';

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
  { path: 'add-film', component: AddFilmComponent },
  { path: 'add-actor', component: ActorManagerComponent },
  { path: 'add-genre', component: AddGenreComponent },
  { path: 'edit-film/:filmTitle', component: AddFilmComponent },
  { path: 'edit-actor/:actorName', component: ActorManagerComponent },
  { path: 'edit-genre/:genre', component: AddGenreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
