import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';
import { Observable } from 'rxjs';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Actor } from 'src/app/models/actor';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  userCircle = faUserCircle;
  isWaiting: boolean = true;
  actors: Actor[] = [];
  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
    let observable: Observable<any> = this.actorService.getActors();
    observable.subscribe((response) => {
      console.log(response);
      this.actors = response;
      this.isWaiting = false;
    });
  }
}
