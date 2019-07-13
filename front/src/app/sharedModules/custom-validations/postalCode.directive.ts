import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';


export function postalCodeValidatorFactory(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value == "") {
      return null;
    }
    if ((control.value == null) || (control.value.length != 10)) {
      return {
        postalCode: {
          valid: false
        }
      };
    }
    return null;
  };
}



@Directive({
  selector: '[postalCode][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PostalCodeDirective, multi: true }
  ]
})
export class PostalCodeDirective {

  validator: ValidatorFn;

  constructor() {
    this.validator = postalCodeValidatorFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
