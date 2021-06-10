import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actor-manager',
  templateUrl: './actor-manager.component.html',
  styleUrls: ['./actor-manager.component.scss'],
})
export class ActorManagerComponent implements OnInit {
  modify: boolean = false;
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const filmIdFromRoute = routeParams.get('actorID');
    if (filmIdFromRoute) {
      this.modify = true;
      let observable: Observable<any> = this.actorService.getActors();
      observable.subscribe((response) => {
        this.actor = response.find(
          (actor: { id: number }) => actor.id == Number(filmIdFromRoute)
        );
      });
    }
  }

  add() {
    this.actorService.addActor(this.actor).subscribe((response) => {
      this.actor = {
        id: 0,
        firstname: '',
        lastname: '',
        photo_url: '',
        birthdate: '',
      };
      if (response !== null) {
        this.router.navigate(['/actors']);
      } else {
        alert('adding actor failed. try again after one minute, please!');
      }
    });
  }

  edit() {
    this.actorService.editActor(this.actor).subscribe((response) => {
      this.actor = {
        id: 0,
        firstname: '',
        lastname: '',
        photo_url: '',
        birthdate: '',
      };
      if (response !== null) {
        this.router.navigate(['/actors']);
      } else {
        alert('editing actor failed. try again after one minute, please!');
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
