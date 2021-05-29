import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as BlankStar } from '@fortawesome/free-regular-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent implements OnInit {
  fullStar = fullStar;
  halfStar = halfStar;
  blankStar = BlankStar;
  film: any = {};

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const filmIdFromRoute = routeParams.get('filmTitle');
    let observable: Observable<any> = this.filmService.getFilms();
    observable.subscribe((response) => {
      this.film = response.find(
        (film: { title: string }) => film.title == filmIdFromRoute
      );
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
}
