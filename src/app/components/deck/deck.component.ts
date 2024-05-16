import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CardInterface } from '../../interfaces/card-interface.interface';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-deck',
	standalone: true,
	imports: [NgIf, NgFor, NgClass, HeaderComponent, RouterLink],
	templateUrl: './deck.component.html',
	styleUrl: './deck.component.css'
})
export class DeckComponent {
	public cardArray: CardInterface[];

	constructor(private storeService: StoreService) {
		this.cardArray = [];
		this.getDeckStored();
	}

	public getDeckStored(): void {
		this.cardArray = this.storeService.getDataStore();
	};

}
