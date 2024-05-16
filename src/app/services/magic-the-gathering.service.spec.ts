import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MagicTheGatheringService } from './magic-the-gathering.service';
import { CardFormInterface } from '../interfaces/card-form-interface.interface';

describe('MagicTheGatheringService', () => {
	let service: MagicTheGatheringService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [MagicTheGatheringService]
		});
		service = TestBed.inject(MagicTheGatheringService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify(); // Verificar se todas as solicitações foram devidamente tratadas
	});

	it('should send GET request with correct params for getSets()', () => {
		const mockCardForm: CardFormInterface = { name: 'SomeName', block: 'SomeBlock' };
		const expectedUrl = 'https://api.magicthegathering.io/v1/sets';

		service.getSets(mockCardForm).subscribe();

		const req = httpTestingController.expectOne((request) => {
			return request.url === expectedUrl && request.method === 'GET';
		});

		expect(req.request.params.get('name')).toEqual('SomeName');
		expect(req.request.params.get('block')).toEqual('SomeBlock');
		expect(req.request.headers.get('Content-Type')).toEqual('application/json');

		req.flush({}); // Simular uma resposta vazia para completar a requisição
	});

	it('should handle API response correctly for getSets()', () => {
		const mockCardForm: CardFormInterface = { name: 'SomeName', block: 'SomeBlock' };
		const mockResponse = { sets: [{ id: 1, name: 'Set 1' }] };

		service.getSets(mockCardForm).subscribe((response) => {
			expect(response.sets).toEqual([{ id: 1, name: 'Set 1' }]);
		});

		const req = httpTestingController.expectOne('https://api.magicthegathering.io/v1/sets?name=SomeName&block=SomeBlock');
		req.flush(mockResponse); // Simular uma resposta com dados
	});

	it('should handle API error correctly for getSets()', () => {
		const mockCardForm: CardFormInterface = { name: 'SomeName', block: 'SomeBlock' };

		service.getSets(mockCardForm).subscribe(
			() => { },
			(error) => {
				expect(error).toBeTruthy(); // Verificar se um erro foi recebido
			}
		);

		const req = httpTestingController.expectOne('https://api.magicthegathering.io/v1/sets?name=SomeName&block=SomeBlock');
		req.error(new ErrorEvent('network error')); // Simular um erro na requisição
	});

	it('should send GET request with correct params for getBoosters()', () => {
		const setId = 'someId';
		const expectedUrl = `https://api.magicthegathering.io/v1/sets/${setId}/booster`;

		service.getBoosters(setId).subscribe();

		const req = httpTestingController.expectOne((request) => {
			return request.url === expectedUrl && request.method === 'GET';
		});

		expect(req.request.headers.get('Content-Type')).toEqual('application/json');

		req.flush({});
	});

	it('should handle API response correctly for getBoosters()', () => {
		const setId = 'someId';
		const mockResponse = { booster: [{ card: 'Card 1' }, { card: 'Card 2' }] };

		service.getBoosters(setId).subscribe((response) => {
			expect(response.booster).toEqual([{ card: 'Card 1' }, { card: 'Card 2' }]);
		});

		const req = httpTestingController.expectOne(`https://api.magicthegathering.io/v1/sets/${setId}/booster`);
		req.flush(mockResponse);
	});

	it('should handle API error correctly for getBoosters()', () => {
		const setId = 'someId';

		service.getBoosters(setId).subscribe(
			() => { },
			(error) => {
				expect(error).toBeTruthy();
			}
		);

		const req = httpTestingController.expectOne(`https://api.magicthegathering.io/v1/sets/${setId}/booster`);
		req.error(new ErrorEvent('network error'));
	});
});
