import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";

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
}