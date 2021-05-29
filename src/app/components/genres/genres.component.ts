import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  film = faFilm;
  isWating = true;
  genres: any[] = [];
  constructor(
    private genreService: GenreService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    let observable: Observable<any> = this.genreService.getGenres();
    observable.subscribe((response) => {
      console.log(response);
      this.genres = response;
      this.isWating = false;
    });
  }
}
