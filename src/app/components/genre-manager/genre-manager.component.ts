import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre-manager',
  templateUrl: './genre-manager.component.html',
  styleUrls: ['./genre-manager.component.scss'],
})
export class GenreManagerComponent implements OnInit {
  modify: boolean = false;
  genre: Genre = {
    name: '',
    image_url: '',
  };
  constructor(
    private genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const filmIdFromRoute = routeParams.get('genreID');
    if (filmIdFromRoute) {
      this.modify = true;
      let observable: Observable<any> = this.genreService.getGenres();
      observable.subscribe((response) => {
        this.genre = response.find(
          (genre: { id: number }) => genre.id == Number(filmIdFromRoute)
        );
      });
    }
  }

  add() {
    this.genreService.addGenre(this.genre).subscribe((response) => {
      this.genre = {
        id: 0,
        name: '',
        image_url: '',
      };
      if (response !== null) {
        this.router.navigate(['/genres']);
      } else {
        alert('adding genre failed. try again after one minute, please!');
      }
    });
  }

  edit() {
    this.genreService.editGenre(this.genre).subscribe((response) => {
      this.genre = {
        id: 0,
        name: '',
        image_url: '',
      };
      if (response !== null) {
        this.router.navigate(['/genres']);
      } else {
        alert('editing genre failed. try again after one minute, please!');
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
