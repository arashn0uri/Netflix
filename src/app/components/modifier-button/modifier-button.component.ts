import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modifier-button',
  templateUrl: './modifier-button.component.html',
  styleUrls: ['./modifier-button.component.scss'],
})
export class ModifierButtonComponent implements OnInit {
  @Input() name: any;
  @Input() field: any;
  @Input() show: boolean | null = false;
  @Input() link: any;
  @Input() label: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = this.name;
    modalRef.componentInstance.field = this.field[0];
  }
}
