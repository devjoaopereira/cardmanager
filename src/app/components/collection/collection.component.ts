import { Component, Input } from '@angular/core';
import { SetInterface } from '../../interfaces/set-interface.interface';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {
  @Input() public setArray: SetInterface[];

  constructor() {
    this.setArray = [];
  }
}
