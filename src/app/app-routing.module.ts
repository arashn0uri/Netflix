import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ActorsComponent } from './components/actors/actors.component';
import { GenresComponent } from './components/genres/genres.component';
import { ActorManagerComponent } from './components/actor-manager/actor-manager.component';
import { FilmManagerComponent } from './components/film-manager/film-manager.component';
import { GenreManagerComponent } from './components/genre-manager/genre-manager.component';
import { ProfileManagerComponent } from './components/profile/profile-manager/profile-manager.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'films', component: FilmListComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'filmDetails/:filmTitle', component: FilmDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: ProfileManagerComponent },
  { path: 'add-film', component: FilmManagerComponent },
  { path: 'actors', component: ActorsComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'add-film', component: FilmManagerComponent },
  { path: 'edit-film/:filmID', component: FilmManagerComponent },
  { path: 'add-actor', component: ActorManagerComponent },
  { path: 'edit-actor/:actorID', component: ActorManagerComponent },
  { path: 'add-genre', component: GenreManagerComponent },
  { path: 'edit-genre/:genreID', component: GenreManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
