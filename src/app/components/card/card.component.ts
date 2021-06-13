import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as blankStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  blankStar = blankStar;
  halfStar = halfStar;
  fullStar = fullStar;
  @Input() public img: string = '';
  @Input() public title: string = '';
  @Input() public description: string = '';
  @Input() public name: any;
  @Input() public field: any;
  @Input() public link: any;
  @Input() public modify: boolean | undefined = false;
  @Input() public vote: number = 0;
  @Input() public filmLink: string[] = [];
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  createRangeForStar(number: number, color: string) {
    number = color === 'gold' ? Math.floor(number) : Math.floor(number);
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  createRangeForHalfStar(number: number, color: string) {
    number = color === 'gold' ? Math.floor(number) : Math.ceil(number);
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = this.name;
    modalRef.componentInstance.field = this.field[0];
  }
}
