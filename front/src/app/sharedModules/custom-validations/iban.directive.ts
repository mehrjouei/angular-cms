import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';

declare let bigInt;
export function iBanValidatorFactory(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value=="") {
      return null;
    }
    if (control.value!=null && (control.value.length != 24))
      return {
        iBan: {
          valid: false
        }
      };
    try {
      let strCD = persianToEnglish(control.value).substring(0, 2);
      let strBBAN = persianToEnglish(control.value).substring(2, control.value.length);
      //"IR" --> "1827"
      let strNewIban = strBBAN + "1827" + strCD;
      let bigValue = bigInt(strNewIban);
      let bigValue97 = bigInt("97");
      let lRemand = bigValue.mod(bigValue97);
      let bigValue1 = bigInt("1");
      if (!lRemand.equals(bigValue1)) {
        return {
          iBan: {
            valid: false
          }
        };
      }

    }
    catch (error) {
      return {
        iBan: {
          valid: false
        }
      };
    }

    return null;

  }
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
  selector: '[iBanValidation][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IBanDirective, multi: true }
  ]
})
export class IBanDirective {

  validator: ValidatorFn;

  constructor() {
    this.validator = iBanValidatorFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}
