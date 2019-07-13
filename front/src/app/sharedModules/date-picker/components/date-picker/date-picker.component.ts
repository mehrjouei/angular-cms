import { Component, OnInit, OnChanges, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms';
import { DialogService } from 'src/app/sharedModules/dialog/dialog.service';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() date: any;
  selectedDate = '';

  @Input() min = 0; // TODO
  @Input() max = 0;
  validateFn: Function;

  constructor(private dialog: DialogService) {
  }

  ngOnInit() {
    this.validateFn = createCounterRangeValidator(this.max, this.min);
  }

  ngOnChanges(changes) {
    if (changes.min || changes.max) {
      this.validateFn = createCounterRangeValidator(this.max, this.min);
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  writeValue(value: any) {
    this.date = value;
    this.selectedDate = this.date;
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  openDialog() {
    this.dialog.open(DatePickerDialogComponent, {
      data: {
        header: 'تاریخ',
        text: 'Pick a bloody date',
        // date: this.date,
        date: this.selectedDate,
        size: 'date-picker'
      }
    }).afterClosed.subscribe((date: any) => {
      if (!date) {
        // date = '';
        return;
      }
      this.selectedDate = date;
      this.propagateChange(date);
    });
  }

  onDateChange(e) {
    const date = e.target.value;
    this.selectedDate = date;
    this.propagateChange(date);
  }
}

export function createCounterRangeValidator(min, max) {
  return function validateCounterRange(c: FormControl) { // TODO
    // const err = {
    //   rangeError: {
    //     given: c.value,
    //     min,
    //     max
    //   }
    // };
    // return (c.value > +max || c.value < +min) ? err : null;
    return c.value && new RegExp('(\\d){4}\/(\\d){1,2}\/(\\d){1,2}').test(c.value) ? null : 'wrong date';
  };
}
