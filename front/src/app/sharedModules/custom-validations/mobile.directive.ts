import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';


export function customeMobileValidatorFactory(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log(control.value);
    if (control.value!=null && (control.value.length != 11) && (control.value.length != 0)) {
      return {
        mobile: {
          valid: false
        }
      };
    }
    if (control.value) {
      if (persianToEnglish(control.value).substring(0, 2) != "09") {
        return {
          mobile: {
            valid: false
          }
        };
      }
    }
    
    return null;


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
  selector: '[customeMobile][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CustomeMobileDirective, multi: true }
  ]
})
export class CustomeMobileDirective {

  validator: ValidatorFn;

  constructor() {
    this.validator = customeMobileValidatorFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
