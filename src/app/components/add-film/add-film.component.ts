import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/models/film';
import { ActorService } from 'src/app/services/actor.service';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
})
export class AddFilmComponent implements OnInit {
  actors: Actor[] = [];
  genres: Genre[] = [];
  film: Film = {
    id: 0,
    title: '',
    description: '',
    plot: '',
    director: '',
    duration: { hours: 0, minutes: 0 },
    release_year: 0,
    cover_url: '',
    tags: '',
    created_by: 0,
    stars: 0,
    actors: [],
    genres: [],
    vote: 0,
  };
  constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    let actorObservable: Observable<any> = this.actorService.getActors();
    actorObservable.subscribe((response) => {
      this.actors = response;
      this.actors.map((actor) => (actor.selected = false));
    });
    let genreObservable: Observable<any> = this.genreService.getGenres();
    genreObservable.subscribe((response) => {
      this.genres = response;
      this.genres.map((genre) => (genre.selected = false));
    });
  }

  add() {
    this.filmService.addFilm(this.film).subscribe((response) => {
      console.log(response);
      this.film = {
        id: 0,
        title: '',
        description: '',
        plot: '',
        director: '',
        duration: { hours: 0, minutes: 0 },
        release_year: 0,
        cover_url: '',
        created_by: 0,
        tags: '',
        stars: 0,
        actors: [],
        genres: [],
        vote: 0,
      };
    });
  }

  actorSelectHandler(id: number) {
    let actor = this.actors.find((actor) => actor.id === id);
    if (actor) {
      this.actors = this.actors.map((actor) => {
        if (actor.id === id) actor.selected = !actor.selected;
        return actor;
      });
    }
  }

  genreSelectHandler(name: string) {
    let genre = this.genres.find((genre) => genre.name === name);
    if (genre) {
      this.genres = this.genres.map((genre) => {
        if (genre.name === name) genre.selected = !genre.selected;
        return genre;
      });
    }
  }
}
