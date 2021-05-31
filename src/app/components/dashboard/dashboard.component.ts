import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmService } from '../../services/film.service';
import { Film } from 'src/app/models/film';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as blankStar } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  blankStar = blankStar;
  halfStar = halfStar;
  fullStar = fullStar;
  userID: number | undefined = 0;
  films: Film[] = [];
  isWaiting = true;
  lastFilms: Film[] = [];
  topFilms: Film[] = [];
  constructor(
    private filmService: FilmService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let observable: Observable<any> = this.filmService.getFilms();
    observable.subscribe((response) => {
      this.lastFilms = this.filmService.getLastFilms(response);
      this.lastFilms = this.lastFilms.map((film) => {
        film.starRating =
          film.votes?.some(
            (vote) => vote.user_id === this.userService.loggedUser?.id
          ) && film.created_by === this.userService.loggedUser?.id
            ? film.vote
            : 0;
        return film;
      });
      this.topFilms = this.filmService.getTopFilms(response);
      this.isWaiting = false;
    });
    this.userID = this.userService.loggedUser?.id;
  }

  delete(film: Film) {
    this.filmService.deleteFilm(film).subscribe((response) => {
      if (response !== null) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('deleting film failed. try again after one minute, please!');
      }
    });
  }

  edit(star: number, film: Film) {
    let breakLoop = film.votes?.some(
      (vote) => vote.user_id === this.userService.loggedUser?.id
    );
    breakLoop
      ? film.votes?.map((vote) => {
          if (vote.user_id === this.userService.loggedUser?.id) {
            vote.vote = star;
            return vote;
          }
        })
      : film.votes?.push({
          id: this.userService.loggedUser?.id,
          user_id: this.userService.loggedUser?.id,
          vote: star,
        });
    console.log(film);
    this.filmService.editFilm(film).subscribe((response) => {
      if (response !== null) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('editing film failed. try again after one minute, please!');
      }
    });
  }

  createRangeForStar(number: number, color: string) {
    number = color === 'gold' ? Math.floor(number) : Math.floor(number);
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
  createRangeForHalfStar(number: number, color: string) {
    number = color === 'gold' ? Math.floor(number) : Math.ceil(number);
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  sth(newRate: number) {
    console.log(newRate);
  }
}
