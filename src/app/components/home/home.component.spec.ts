import { Observable, Subscriber, of } from "rxjs";
import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MagicTheGatheringService } from "../../services/magic-the-gathering.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

class MockMagicTheGatheringService {
	getSets() {
		return of({ sets: [{ id: 1, name: 'Set 1' }] });
	}
}

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	let magicService: MagicTheGatheringService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [],
			imports: [FormsModule, ReactiveFormsModule, HomeComponent],
			providers: [
				{ provide: MagicTheGatheringService, useClass: MockMagicTheGatheringService }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		magicService = TestBed.inject(MagicTheGatheringService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set loading to true and call getSetsData()', () => {
		component.cardForm.name?.setValue('Some Name');
		component.cardForm.block?.setValue('Some Block');
		spyOn(component, 'getSetsData');

		component.onSearchSet();

		expect(component.loading).toBeTrue();
		expect(component.getSetsData).toHaveBeenCalled();
	});

	it('should set loading to false and populate setArray on successful getSetsData()', () => {
		spyOn(magicService, 'getSets').and.callThrough();
		component.cardForm.name?.setValue('Some Name');
		component.cardForm.block?.setValue('Some Block');

		component.getSetsData();

		expect(component.loading).toBeFalse();
		expect(component.setArray.length).toBe(1); // Garantir que o setArray seja devidamente retornado
		expect(component.setArray[0].name).toBe('Set 1');
	});
});
