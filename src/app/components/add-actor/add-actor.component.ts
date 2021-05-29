import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.scss'],
})
export class AddActorComponent implements OnInit {
  actor: Actor = {
    id: 0,
    firstname: '',
    lastname: '',
    photo_url: '',
    birthdate: new Date(),
  };
  constructor(private actorService: ActorService) {}

  ngOnInit(): void {}

  add() {
    this.actorService.addActors(this.actor).subscribe((response) => {
      console.log(response);
      this.actor = {
        id: 0,
        firstname: '',
        lastname: '',
        photo_url: '',
        birthdate: new Date(),
      };
    });
  }
}
