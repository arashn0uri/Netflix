import { Component, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Film } from 'src/app/models/film';
import { ActorService } from 'src/app/services/actor.service';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-film-manager',
  templateUrl: './film-manager.component.html',
  styleUrls: ['./film-manager.component.scss'],
})
export class FilmManagerComponent implements OnInit {
  modify: Boolean = false;
  actors: Actor[] = [];
  genres: Genre[] = [];
  film: Film = {
    id: 0,
    title: '',
    description: '',
    plot: '',
    director: '',
    duration: '',
    release_year: 0,
    cover_url: '',
    tags: '',
    created_by: 0,
    stars: [],
    actors: [],
    genres: [],
    vote: 0,
    starRating: 0,
  };
  constructor(
    private filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    let actorObservable: Observable<any> = this.actorService.getActors();
    actorObservable.subscribe((response) => {
      this.actors = response;
      this.actors.map((actor) => (actor.selected = false));
      this.actors.sort((firstActor, secondActor) => {
        return secondActor.firstname > firstActor.firstname ? -1 : 1;
      });
    });
    let genreObservable: Observable<any> = this.genreService.getGenres();
    genreObservable.subscribe((response) => {
      this.genres = response;
      this.genres.map((genre) => (genre.selected = false));
      this.genres.sort((firstGenre, secondGenre) => {
        return secondGenre.name > firstGenre.name ? -1 : 1;
      });
    });
    const routeParams = this.route.snapshot.paramMap;
    const filmIdFromRoute = routeParams.get('filmID');
    if (filmIdFromRoute) {
      this.modify = true;
      let observable: Observable<any> = this.filmService.getFilms();
      observable.subscribe((response) => {
        this.film = response.find(
          (film: { id: number }) => film.id == Number(filmIdFromRoute)
        );
        this.film.genres.forEach((genre) => {
          this.genres.map((localGenre) => {
            if (localGenre.name === genre.name) {
              localGenre.selected = true;
            }
            return localGenre;
          });
        });
        this.film.actors.forEach((actor) => {
          this.actors.map((localActor) => {
            if (localActor.firstname === actor.firstname) {
              localActor.selected = true;
            }
            return localActor;
          });
        });
      });
    }
  }

  add() {
    this.film.actors = this.actors.filter((actor) => actor.selected);
    this.film.genres = this.genres.filter((genre) => genre.selected);
    this.film.plot = this.film.description;
    this.film.tags = this.film.title;
    this.filmService.addFilm(this.film).subscribe((response) => {
      this.film = {
        id: 0,
        title: '',
        description: '',
        plot: '',
        director: '',
        duration: '',
        release_year: 0,
        cover_url: '',
        created_by: 0,
        tags: '',
        stars: [],
        actors: [],
        genres: [],
        vote: 0,
        starRating: 0,
      };
      if (response !== null) {
        this.router.navigate(['/films']);
      } else {
        alert('adding film failed. try again after one minute, please!');
      }
    });
  }

  edit() {
    this.film.actors = this.actors.filter((actor) => actor.selected);
    this.film.genres = this.genres.filter((genre) => genre.selected);
    this.film.plot = this.film.description;
    this.film.tags = this.film.title;
    this.filmService.editFilm(this.film).subscribe((response) => {
      this.film = {
        id: 0,
        title: '',
        description: '',
        plot: '',
        director: '',
        duration: '',
        release_year: 0,
        cover_url: '',
        created_by: 0,
        tags: '',
        stars: [],
        actors: [],
        genres: [],
        vote: 0,
        starRating: 0,
      };
      if (response !== null) {
        this.router.navigate(['/films']);
      } else {
        alert('editing film failed. try again after one minute, please!');
      }
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

  goBack() {
    this.location.back();
  }
}
