import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  isWaiting = true;
  films: any = [];
  constructor(private FilmService: FilmService) {}

  ngOnInit(): void {
    let observable: Observable<any> = this.FilmService.getFilms();
    observable.subscribe((response) => {
      this.films = response;
      console.log(this.films);
      this.isWaiting = false;
    });
  }
}
