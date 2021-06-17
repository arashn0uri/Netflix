import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { GenreService } from 'src/app/services/genre.service';
import { UserService } from 'src/app/services/user.service';
import { Genre } from 'src/app/models/genre';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  film = faFilm;
  isWaiting = true;
  userID: number | undefined = undefined;
  genres: any[] = [];
  constructor(
    private genreService: GenreService,
    public userService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userID = this.userService.loggedUser
      ? this.userService.loggedUser.id
      : undefined;
    let observable: Observable<any> = this.genreService.getGenres();
    observable.subscribe((response) => {
      this.genres = response;
      this.genres = this.genres.map((genre) => {
        genre.modify = genre.id > 300;
        return genre;
      });
      this.isWaiting = false;
    });
  }

  openModal(genre: Genre) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = genre;
    modalRef.componentInstance.field = 'genre';
  }
}
