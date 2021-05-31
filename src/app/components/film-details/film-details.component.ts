import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as blankStar } from '@fortawesome/free-regular-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { Film } from 'src/app/models/film';
import { Location } from '@angular/common';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent implements OnInit {
  fullStar = fullStar;
  halfStar = halfStar;
  blankStar = blankStar;
  isWaiting: boolean = true;
  show: boolean = false;
  film: any = {};

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    public userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const filmIdFromRoute = routeParams.get('filmTitle');
    let observable: Observable<any> = this.filmService.getFilms();
    observable.subscribe((response) => {
      this.film = response.find(
        (film: { title: string }) => film.title == filmIdFromRoute
      );
      this.isWaiting = false;
      this.show =
        this.userService.loggedUser &&
        this.film.created_by === this.userService.loggedUser.id
          ? true
          : false;
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

  goBack() {
    this.location.back();
  }
}
