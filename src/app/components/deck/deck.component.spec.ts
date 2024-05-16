import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckComponent } from './deck.component';
import { StoreService } from '../../services/store.service';
import { CardInterface } from '../../interfaces/card-interface.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeckComponent', () => {
	let component: DeckComponent;
	let fixture: ComponentFixture<DeckComponent>;
	let storeService: StoreService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, DeckComponent, HttpClientTestingModule],
			providers: [StoreService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DeckComponent);
		component = fixture.componentInstance;
		storeService = TestBed.inject(StoreService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should populate cardArray with data from StoreService', () => {
		const mockCards: CardInterface[] = [
			{ name: 'Archangel Avacyn', types: ['Creature'], manaCost: '{5}{U}', colorIdentity: ['U', 'R'], imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=401863&type=card', text: 'Example' },
			{ name: 'Slithering Shade', types: ['Enchantment'], manaCost: '{5}{U}', colorIdentity: ['U',], imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=401863&type=card', text: 'Example' },
			{ name: 'Paladin of Prahv', types: ['Creature'], manaCost: '{5}{U}', colorIdentity: ['U', 'B'], imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=401863&type=card', text: 'Example' }
		];

		spyOn(storeService, 'getDataStore').and.returnValue(mockCards); // Simular dados de retorno do StoreService

		component.getDeckStored(); // Chamar o método para popular cardArray

		expect(component.cardArray).toEqual(mockCards); // Verificar se cardArray foi populado corretamente
	});
});