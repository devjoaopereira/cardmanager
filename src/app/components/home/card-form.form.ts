import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { CardFormInterface } from "../../interfaces/card-form-interface.interface";

export class CardForm extends FormGroup {
    constructor() {
        super({
            name: new FormControl(null),
            block: new FormControl(null, [Validators.required])
        });
    }

    public get name(): AbstractControl | null {
        return this.get('name');
    }

    public get block(): AbstractControl | null {
        return this.get('block');
    }

    public getDadosForm(): CardFormInterface {
        this.deleteValuesNull();
        return this.value;
    }

    private deleteValuesNull(): void {
        for (const control in this.value) {
            if (this.value[control] === null || this.value === "") {
                delete this.value[control];
            }
        }
    }
}