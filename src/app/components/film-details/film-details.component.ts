import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
})
export class FilmDetailsComponent implements OnInit {
  film: any = {};

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const filmIdFromRoute = routeParams.get('filmId');
    console.log(filmIdFromRoute);
    let observable: Observable<any> = this.filmService.getFilms();
    observable.subscribe((response) => {
      this.film = response.find(
        (film: { id: string }) => film.id == filmIdFromRoute
      );
    });
  }
}
