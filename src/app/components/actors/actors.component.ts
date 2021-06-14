import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';
import { Observable } from 'rxjs';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Actor } from 'src/app/models/actor';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  userCircle = faUserCircle;
  isWaiting: boolean = true;
  userID: number | undefined = 0;
  actors: Actor[] = [];
  constructor(
    private actorService: ActorService,
    public userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userID = this.userService.loggedUser
      ? this.userService.loggedUser.id
      : undefined;
    let observable: Observable<any> = this.actorService.getActors();
    observable.subscribe((response) => {
      this.actors = response;
      this.actors = this.actors.map((actor) => {
        actor.modify = actor.created_by === this.userID;
        return actor;
      });
      this.actors.sort((firstActor, secondActor) => {
        return secondActor.firstname > firstActor.firstname ? -1 : 1;
      });
      this.isWaiting = false;
    });
  }

  openModal(actor: Actor) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = actor;
    modalRef.componentInstance.field = 'attore';
  }
}
