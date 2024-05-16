import { Component } from '@angular/core';
import { CardForm } from './card-form.form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MagicTheGatheringService } from '../../services/magic-the-gathering.service';
import { finalize, take } from 'rxjs';
import { NgIf } from '@angular/common';
import { SetInterface } from '../../interfaces/set-interface.interface';
import { CollectionComponent } from '../collection/collection.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgIf,
		CollectionComponent,
		HeaderComponent
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {
	public loading: boolean;
	public setArray: SetInterface[];
	public showMsgError: boolean;

	private _form: CardForm;

	constructor(private magicTheGatheringService: MagicTheGatheringService) {
		this.loading = false;
		this.setArray = [];
		this.showMsgError = false;
		this._form = new CardForm();
	}

	public get cardForm(): CardForm {
		return this._form;
	}

	public onSearchSet() {
		this.cardForm.name?.markAsDirty();
		this.cardForm.block?.markAsDirty();

		if (this.cardForm.valid) {
			this.loading = true;
			this.showMsgError = false;
			this.setArray = [];
			this.getSetsData();
		}
	}

	public getSetsData(): void {
		this.magicTheGatheringService
			.getSets(this.cardForm.getDadosForm())
			.pipe(
				finalize(() => {
					this.loading = false;
				}),
				take(1)
			)
			.subscribe({
				next: (response) => {
					if (response && response.sets.length) {
						this.setArray = response.sets
					} else {
						this.showMsgError = true;
					};
				},
				error: () => {
					console.error('Ocorreu um erro inesperado...');
				}
			})
	}
}
