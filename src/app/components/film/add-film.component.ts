import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/models/film';
import { Time } from '@angular/common';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class AddFilmComponent implements OnInit {
  film: Film = {
    id: 0,
    title: "",
    description: "",
    plot: "",
    director: "",
    duration: { hours: 0, minutes: 0 },
    release_year: 0,
    cover_url: "",
    tags: "",
    created_by: 0,
    stars: 0,
    actors: [],
    genres: [],
    vote: 0
  };
  constructor(
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
  }

  add() {
    this.filmService.addFilm(this.film)
      .subscribe(response => {
        console.log(response);
        this.film = {
          id: 0,
          title: "",
          description: "",
          plot: "",
          director: "",
          duration: { hours: 0, minutes: 0 },
          release_year: 0,
          cover_url: "",
          created_by: 0,
          tags: "",
          stars: 0,
          actors: [],
          genres: [],
          vote: 0
        }
      });
  }
}
