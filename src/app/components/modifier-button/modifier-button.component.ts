import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modifier-button',
  templateUrl: './modifier-button.component.html',
  styleUrls: ['./modifier-button.component.scss'],
})
export class ModifierButtonComponent implements OnInit {
  @Input() show: boolean | null = false;
  @Input() link: any = '';
  @Input() label: any = '';
  @Output() remove = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.remove.emit();
  }
}
