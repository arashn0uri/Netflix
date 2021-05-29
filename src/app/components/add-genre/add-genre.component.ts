import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss'],
})
export class AddGenreComponent implements OnInit {
  genre: Genre = {
    name: '',
    image_url: '',
  };
  constructor(
    private genreService: GenreService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const filmIdFromRoute = routeParams.get('genre');
    if (filmIdFromRoute) {
      let observable: Observable<any> = this.genreService.getGenres();
      observable.subscribe((response) => {
        this.genre = response.find(
          (genre: { name: string }) => genre.name == filmIdFromRoute
        );
      });
    }
  }

  add() {
    this.genreService.addGenre(this.genre).subscribe((response) => {
      console.log(response);
      this.genre = {
        id: 0,
        name: '',
        image_url: '',
      };
    });
  }

  edit() {
    this.genreService.editGenre(this.genre).subscribe((response) => {
      console.log(response);
      this.genre = {
        id: 0,
        name: '',
        image_url: '',
      };
    });
  }

  goBack() {
    this.location.back();
  }
}
