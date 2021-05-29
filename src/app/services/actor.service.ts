import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Actor } from '../models/actor';
import { UserService } from './user.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private host = 'https://netflix.cristiancarrino.com';
  actors: Actor[] | null = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient, private userService: UserService) {}

  getActors(): Observable<any> {
    return this.http.get(this.host + '/actor/read.php', this.httpOptions);
  }

  addActor(actor: Actor): Observable<any> {
    let loggedUser = this.userService.getLoggedUser();

    if (!loggedUser) {
      alert('Please login before');
      return of(false);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: loggedUser.token,
      }),
    };

    console.log('Adding actor:', actor);
    return this.http
      .post<any>(this.host + '/actor/create.php', actor, httpOptions)
      .pipe(
        tap((response) => {
          if (response.success) {
            if (this.actors) {
              actor.id = response.id;
              this.actors.push(actor);
            } else {
              this.getActors().subscribe();
            }
          }
        }),
        catchError((error) => {
          alert(error.status + ': ' + error.error);
          return of(false);
        })
      );
  }

  editActor(actor: Actor): Observable<any> {
    let loggedUser = this.userService.getLoggedUser();

    if (!loggedUser) {
      alert('Please login before');
      return of(false);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: loggedUser.token,
      }),
    };

    console.log('Adding actor:', actor);
    return this.http
      .post<any>(this.host + '/actor/update.php', actor, httpOptions)
      .pipe(
        tap((response) => {
          if (response.success) {
            if (this.actors) {
              let actorToEdit = this.actors.find((x) => x.id == actor.id);
              actorToEdit = actor;
            } else {
              this.getActors().subscribe();
            }
          }
        }),
        catchError((error) => {
          alert(error.status + ': ' + error.error);
          return of(false);
        })
      );
  }
}
