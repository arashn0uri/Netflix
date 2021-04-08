import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmService } from '../../services/film.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isWating = true;
  films: any = [];
  constructor(
    private FilmService: FilmService
  ) { }

  ngOnInit(): void {
    let observable: Observable<any> = this.FilmService.getFilms();
    observable.subscribe((response) => {
      this.films = response;
      this.isWating = false;
    });
  }
}
