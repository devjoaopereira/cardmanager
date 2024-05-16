import { Component, Input } from '@angular/core';
import { SetInterface } from '../../interfaces/set-interface.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MagicTheGatheringService } from '../../services/magic-the-gathering.service';
import { EMPTY, expand, takeWhile } from 'rxjs';
import { CardInterface } from '../../interfaces/card-interface.interface';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {
  @Input() public setArray: SetInterface[];
  public cardArray: CardInterface[];
  public loading: boolean;

  constructor(
    private magicTheGatheringService: MagicTheGatheringService,
    private router: Router,
    private storeService: StoreService
  ) {
    this.setArray = [];
    this.cardArray = [];
    this.loading = false;
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
        takeWhile(() => this.cardArray.length < maxCards)
      )
      .subscribe({
        error: () => {
          console.error('Ocorreu um erro inesperado!');
          this.loading = false;
        },
        complete: () =>{
          this.storeService.setDataStore(this.cardArray);
          this.router.navigateByUrl('/mydeck');
        }
      })
  }
}
