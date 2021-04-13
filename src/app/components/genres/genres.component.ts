import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  film = faFilm;
  isWating = true;
  genres: any[] = [];
  constructor(
    private genreService: GenreService
  ) { }

  ngOnInit(): void {
    let observable: Observable<any> = this.genreService.getGenres();
    observable.subscribe((response) => {
      this.genres = response;
      this.isWating = false;
    });
  }
}
