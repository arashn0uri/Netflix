import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  isWaiting = true;
  films: Film[] = [];
  constructor(private FilmService: FilmService) { }

  ngOnInit(): void {
    let observable: Observable<any> = this.FilmService.getFilms();
    observable.subscribe((response) => {
      this.films = response;
      this.isWaiting = false;
    });
  }
}
