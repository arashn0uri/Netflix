import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActorService } from 'src/app/services/actor.service';
import { FilmService } from 'src/app/services/film.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() public name: any;
  @Input() public filed: string = '';
  title: string = '';
  article1: string = 'il ';
  article2: string = 'al ';
  @Input() field: string = '';
  @Output() erase = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    private filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.title = this.name.title ? this.name.title : this.name.name;
    if (!this.title) {
      this.title = `${this.name.firstname} ${this.name.lastname}`;
      this.article1 = "l'";
      this.article2 = "all'";
    }
  }

  delete() {
    if (this.name.title)
      this.filmService.deleteFilm(this.name).subscribe((response) => {
        if (response !== null) {
          location.reload();
        } else {
          alert('deleting film failed. try again after one minute, please!');
        }
      });
    if (this.name.firstname)
      this.actorService.deleteActor(this.name).subscribe((response) => {
        if (response !== null) {
          location.reload();
        } else {
          alert('deleting film failed. try again after one minute, please!');
        }
      });
    if (this.name.name)
      this.genreService.deleteGenre(this.name).subscribe((response) => {
        if (response !== null) {
          location.reload();
        } else {
          alert('deleting genre failed. try again after one minute, please!');
        }
      });
  }
}
