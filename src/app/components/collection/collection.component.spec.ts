import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CollectionComponent } from './collection.component';
import { MagicTheGatheringService } from '../../services/magic-the-gathering.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from '../../services/store.service';
import { of } from 'rxjs';
import { CardInterface } from '../../interfaces/card-interface.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeckComponent } from '../deck/deck.component';

describe('CollectionComponent', () => {
	let component: CollectionComponent;
	let fixture: ComponentFixture<CollectionComponent>;
	let magicService: MagicTheGatheringService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([{ path: 'mydeck', component: DeckComponent }]), HttpClientTestingModule, CollectionComponent],
			providers: [MagicTheGatheringService, StoreService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CollectionComponent);
		component = fixture.componentInstance;
		magicService = TestBed.inject(MagicTheGatheringService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call getBoostersData and handle response correctly', fakeAsync(() => {
		const setId = 'someId';
		const mockCards: CardInterface[] = [
			{ name: 'Archangel Avacyn', types: ['Creature'], manaCost: '{5}{U}', colorIdentity: ['U', 'R'], imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=401863&type=card', text: 'Example' },
			{ name: 'Slithering Shade', types: ['Enchantment'], manaCost: '{5}{U}', colorIdentity: ['U',], imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=401863&type=card', text: 'Example' },
			{ name: 'Paladin of Prahv', types: ['Creature'], manaCost: '{5}{U}', colorIdentity: ['U', 'B'], imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=401863&type=card', text: 'Example' }
		];

		spyOn(magicService, 'getBoosters').and.returnValue(of({ cards: mockCards }));

		component.getBoostersData(setId);

		tick();

		const creatureCards = component.cardArray.filter(card => card.types.includes('Creature')); // Verificar se o cardArray contém apenas "Creature" cards
		expect(creatureCards.length).toBeGreaterThan(0); // Garantir que pelo menos uma "Creature" tenha sido adicionada ao cardArray
	}));
});
