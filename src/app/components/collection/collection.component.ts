import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SetInterface } from '../../interfaces/set-interface.interface';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MagicTheGatheringService } from '../../services/magic-the-gathering.service';
import { EMPTY, Subject, expand, takeUntil, takeWhile } from 'rxjs';
import { CardInterface } from '../../interfaces/card-interface.interface';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
	selector: 'app-collection',
	standalone: true,
	imports: [NgFor, DatePipe, NgIf, NgClass],
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnDestroy {
	@Input() public setArray: SetInterface[];
	public cardArray: CardInterface[];
	public loading: boolean;
	public showToastError: boolean;

	private _destroy$: Subject<void>;

	constructor(
		private magicTheGatheringService: MagicTheGatheringService,
		private router: Router,
		private storeService: StoreService
	) {
		this.setArray = [];
		this.cardArray = [];
		this.loading = false;
		this.showToastError = false;
		this._destroy$ = new Subject<void>();
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	getBoostersData(id: string) {
		const maxCards = 30;
		this.loading = true;

		this.magicTheGatheringService
			.getBoosters(id)
			.pipe(
				expand(response => {
					const cardsFiltered: CardInterface[] = response.cards.filter((card: CardInterface) => card.types.includes('Creature'));
					const cardsToAdd = Math.min(maxCards - this.cardArray.length, cardsFiltered.length);

					if (cardsToAdd > 0) {
						this.cardArray.push(...cardsFiltered.slice(0, cardsToAdd));
					}

					if (this.cardArray.length < maxCards) {
						return this.magicTheGatheringService.getBoosters(id);
					} else {
						return EMPTY;
					}
				}),
				takeWhile(() => this.cardArray.length < maxCards),
				takeUntil(this._destroy$)
			)
			.subscribe({
				error: () => {
					console.error('Ocorreu um erro inesperado!');
					this.loading = false;
					this.showToastError = true;
					setTimeout(() => {
						this.showToastError = false;
					}, 3000)
				},
				complete: () => {
					if (this.cardArray.length === maxCards) {
						this.storeService.setDataStore(this.cardArray);
						this.router.navigateByUrl('/mydeck');
					}
				}
			})
	}
}
