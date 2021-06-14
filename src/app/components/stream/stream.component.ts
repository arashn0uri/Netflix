import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
