import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmService } from '../../services/film.service';
import { Film } from 'src/app/models/film';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isWating = true;
  lastFilms: Film[] = [];
  topFilms: Film[] = [];
  constructor(
    private FilmService: FilmService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    let observable: Observable<any> = this.FilmService.getFilms();
    observable.subscribe((response) => {
      this.lastFilms = this.FilmService.getLastFilms(response);
      this.topFilms = this.FilmService.getTopFilms(response);
      this.isWating = false;
    });
  }
}
