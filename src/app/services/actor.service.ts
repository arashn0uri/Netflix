import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private filmUrl = 'https://netflix.cristiancarrino.com/actor/read.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  getActors(): Observable<any> {
    return this.http.get(this.filmUrl, this.httpOptions);
  };
}
