import { Component, OnInit } from '@angular/core';
import { CardForm } from './card-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private _form: CardForm;
  
  constructor() {
    this._form = new CardForm();
  }

  ngOnInit() {
    
  }

  public get cardForm(): CardForm {
    return this._form;
  }
}
