import { TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {
	let service: StoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StoreService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set and retrieve data correctly using setDataStore() and getDataStore()', () => {
		const testData = { name: 'Test Card', type: 'Creature' };

		service.setDataStore(testData); // Testar o método setDataStore()

		const retrievedData = service.getDataStore(); // Testar o método getDataStore()

		expect(retrievedData).toEqual(testData); // Verificar se os dados recuperados correspondem aos dados definidos
	});

	it('should return undefined if no data is set', () => {
		const retrievedData = service.getDataStore(); // Testar o método getDataStore() sem definir nenhum dado

		expect(retrievedData).toBeUndefined(); // Esperar indefinido quando nenhum dado for definido
	});
});