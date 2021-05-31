import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';
import { Observable } from 'rxjs';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Actor } from 'src/app/models/actor';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    let observable: Observable<any> = this.actorService.getActors();
    observable.subscribe((response) => {
      this.actors = response;
      this.actors.sort((firstActor, secondActor) => {
        return secondActor.firstname > firstActor.firstname ? -1 : 1;
      });
      this.isWaiting = false;
    });
    this.userID = this.userService.loggedUser?.id;
  }
}
