import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Actor } from 'src/app/models/actor';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
import { User } from 'src/app/models/user';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss'],
})
export class ProfileManagerComponent implements OnInit {
  myControlActor = new FormControl();
  myControlFilm = new FormControl();
  myControlGenre = new FormControl();
  filteredActors: Observable<string[]> | null = null;
  filteredFilms: Observable<string[]> | null = null;
  filteredGenres: Observable<string[]> | null = null;
  selectedActors: string[] = [];
  selectedFilms: string[] = [];
  selectedGenres: string[] = [];
  films: Film[] = [];
  actors: Actor[] = [];
  genres: Genre[] = [];
  user: User | null = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    photo_url: '',
    birthdate: '',
    token: '',
    favorite_actors: '',
    favorite_films: '',
    favorite_genres: '',
  };
  constructor(
    private userService: UserService,
    private filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
    let actorObservable: Observable<any> = this.actorService.getActors();
    actorObservable.subscribe((response) => {
      this.actors = response;
      this.actors.map((actor) => {
        actor.fullname = `${actor.firstname} ${actor.lastname}`;
        return actor;
      });
      this.actors.sort((firstActor, secondActor) => {
        return secondActor.firstname > firstActor.firstname ? -1 : 1;
      });
      this.filteredActors = this.myControlActor.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterActor(value))
      );
      let favoriteActors = this.user ? this.user.favorite_actors : '';
      favoriteActors?.split(',').forEach((id) => {
        let actor = this.actors.find((actor) => actor.id == +id);
        if (actor && actor.fullname) this.selectedActors.push(actor.fullname);
      });
    });

    let genreObservable: Observable<any> = this.genreService.getGenres();
    genreObservable.subscribe((response) => {
      this.genres = response;
      this.genres.sort((firstGenre, secondGenre) => {
        return secondGenre.name > firstGenre.name ? -1 : 1;
      });
      this.filteredGenres = this.myControlGenre.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterGenre(value))
      );
      let favoriteGenres = this.user ? this.user.favorite_genres : '';
      favoriteGenres?.split(',').forEach((id) => {
        let genre = this.genres.find((genre) => genre.id == +id);
        if (genre && genre.name) this.selectedGenres.push(genre.name);
      });
    });

    let filmObservable: Observable<any> = this.filmService.getFilms();
    filmObservable.subscribe((response) => {
      this.films = response;
      this.films.sort((firstFilm, secondFilm) => {
        return secondFilm.title > firstFilm.title ? -1 : 1;
      });
      this.filteredFilms = this.myControlFilm.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterFilm(value))
      );
      let favoriteFilms = this.user ? this.user.favorite_films : '';
      favoriteFilms?.split(',').forEach((id) => {
        let film = this.films.find((film) => film.id == +id);
        if (film && film.title) this.selectedFilms.push(film.title);
      });
    });
  }

  private _filterActor(value: string): string[] {
    const filterValue = value.toLowerCase();
    const fullName: string[] = [];
    this.actors.forEach((actor) => {
      if (actor.fullname) fullName.push(actor.fullname);
    });

    return fullName.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterFilm(value: string): string[] {
    const filterValue = value.toLowerCase();
    const title: string[] = [];
    this.films.forEach((film) => {
      if (film.title) title.push(film.title);
    });

    return title.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterGenre(value: string): string[] {
    const filterValue = value.toLowerCase();
    const name: string[] = [];
    this.genres.forEach((genre) => {
      if (genre.name) name.push(genre.name);
    });

    return name.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  edit() {
    this.userService
      .editFavoriteFilms(this.user?.favorite_films)
      .subscribe((response) => {
        if (response === null) {
          alert(
            'editing your favorite films failed. try again after one minute, please!'
          );
        }
      });

    this.userService
      .editFavoriteActors(this.user?.favorite_actors)
      .subscribe((response) => {
        if (response === null) {
          alert(
            'editing your favorite actors failed. try again after one minute, please!'
          );
        }
      });

    this.userService
      .editFavoriteGenres(this.user?.favorite_genres)
      .subscribe((response) => {
        if (response === null) {
          alert(
            'editing your favorite actors failed. try again after one minute, please!'
          );
        }
      });

    this.userService.editUser(this.user).subscribe((response) => {
      if (response !== null) {
        this.router.navigate(['/profile']);
      } else {
        alert(
          'editing your profile failed. try again after one minute, please!'
        );
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

  selectFilm(film: any) {
    if (!this.selectedFilms.includes(film)) this.selectedFilms.push(film);
    let selected: any = [];
    this.selectedFilms.forEach((select) => {
      let film = this.films.find((film) => film.title == select);
      selected.push(film?.id);
    });
    if (this.user) this.user.favorite_films = selected.join(',');
  }

  cancelFilm(film: string) {
    let index = this.selectedFilms.findIndex((select) => select == film);
    this.selectedFilms.splice(index, 1);

    let selected: any = [];
    this.selectedFilms.forEach((select) => {
      let film = this.films.find((film) => film.title == select);
      selected.push(film?.id);
    });
    if (this.user) this.user.favorite_films = selected.join(',');
  }

  selectActor(actor: any) {
    if (!this.selectedActors.includes(actor)) this.selectedActors.push(actor);
    let selected: any = [];
    this.selectedActors.forEach((select) => {
      let actor = this.actors.find((actor) => actor.fullname == select);
      selected.push(actor?.id);
    });
    if (this.user) this.user.favorite_actors = selected.join(',');
  }

  cancelActor(actor: string) {
    let index = this.selectedActors.findIndex((select) => select == actor);
    this.selectedActors.splice(index, 1);

    let selected: any = [];
    this.selectedActors.forEach((select) => {
      let actor = this.actors.find((actor) => actor.fullname == select);
      selected.push(actor?.id);
    });
    if (this.user) this.user.favorite_actors = selected.join(',');
  }

  selectGenre(genre: any) {
    if (!this.selectedGenres.includes(genre)) this.selectedGenres.push(genre);
    let selected: any = [];
    this.selectedGenres.forEach((select) => {
      let genre = this.genres.find((genre) => genre.name == select);
      selected.push(genre?.id);
    });
    if (this.user) this.user.favorite_genres = selected.join(',');
  }

  cancelGenre(genre: string) {
    let index = this.selectedGenres.findIndex((select) => select == genre);
    this.selectedGenres.splice(index, 1);

    let selected: any = [];
    this.selectedGenres.forEach((select) => {
      let genre = this.genres.find((genre) => genre.name == select);
      selected.push(genre?.id);
    });
    if (this.user) this.user.favorite_genres = selected.join(',');
  }

  goBack() {
    this.location.back();
  }
}
