import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';


export function persianInputValidatorFactory(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let latinRegex: RegExp = /[A-Za-z0-9_\.\-]+/;
    let isValid = latinRegex.test(control.value);
    if (!isValid) {
      return null;
    } else {
      return {
        mobile: {
          valid: false
        }
      };
    }
  };
}



@Directive({
  selector: '[persianInput][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PersianInputDirective, multi: true }
  ]
})
export class PersianInputDirective {

  validator: ValidatorFn;

  constructor() {
    this.validator = persianInputValidatorFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
