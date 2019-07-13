import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';


export function nationalCodeValidatorFactory(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    if ((control.value == null) || (control.value.length != 10)) {
      return {
        nationalCode: {
          valid: false
        }
      };
    }
    let nCD = 0;
    let nSum = 0;
    try {
      for (let i = 0; i < 10; i++) {
        nCD = parseInt(persianToEnglish(control.value.substring(i, i + 1)));
        if (i < 9)
          nSum += (nCD * (10 - i));
      }
      let nRmndr = nSum % 11;              //Calculate check digit according to the given number
      if (nRmndr > 1)
        return nCD == (11 - nRmndr) ? null : { mobile: { valid: false } };            // OK, check digit matchs correctly
      else
        return (nCD == nRmndr) ? null : { mobile: { valid: false } };  // OK, check digit matchs correctly
    }
    catch (error) {
      return null;
    }

  };
  function persianToEnglish(value) {
    var newValue = "";
    for (var i = 0; i < value.length; i++) {
      var ch = value.charCodeAt(i);
      if (ch >= 1776 && ch <= 1785) // For Persian digits.
      {
        var newChar = ch - 1728;
        newValue = newValue + String.fromCharCode(newChar);
      }
      else if (ch >= 1632 && ch <= 1641) // For Arabic & Unix digits.
      {
        var newChar = ch - 1584;
        newValue = newValue + String.fromCharCode(newChar);
      }
      else
        newValue = newValue + String.fromCharCode(ch);
    }
    return newValue;
  }
}



@Directive({
  selector: '[nationalCode][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: NationalCodeDirective, multi: true }
  ]
})
export class NationalCodeDirective {

  validator: ValidatorFn;

  constructor() {
    this.validator = nationalCodeValidatorFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
