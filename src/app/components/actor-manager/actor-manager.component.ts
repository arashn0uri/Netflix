import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actor-manager',
  templateUrl: './actor-manager.component.html',
  styleUrls: ['./actor-manager.component.scss'],
})
export class ActorManagerComponent implements OnInit {
  actor: Actor = {
    id: 0,
    firstname: '',
    lastname: '',
    photo_url: '',
    birthdate: '',
  };
  constructor(
    private actorService: ActorService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const filmIdFromRoute = routeParams.get('actorName');
    if (filmIdFromRoute) {
      let observable: Observable<any> = this.actorService.getActors();
      observable.subscribe((response) => {
        this.actor = response.find(
          (actor: { firstname: string }) => actor.firstname == filmIdFromRoute
        );
      });
    }
  }

  add() {
    this.actorService.addActor(this.actor).subscribe((response) => {
      console.log(response);
      this.actor = {
        id: 0,
        firstname: '',
        lastname: '',
        photo_url: '',
        birthdate: '',
      };
    });
  }

  edit() {
    this.actorService.editActor(this.actor).subscribe((response) => {
      console.log(response);
      this.actor = {
        id: 0,
        firstname: '',
        lastname: '',
        photo_url: '',
        birthdate: '',
      };
    });
  }

  goBack() {
    this.location.back();
  }
}
