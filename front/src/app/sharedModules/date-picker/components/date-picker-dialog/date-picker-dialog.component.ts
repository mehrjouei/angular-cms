import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { jDate } from '../../utils/jDate';
import { DialogRef } from '../../../dialog/dialog-ref';
import { DialogConfig } from '../../../dialog/dialog-config';

@Component({
  selector: 'app-date-picker-dialog',
  templateUrl: './date-picker-dialog.component.html',
  styleUrls: ['./date-picker-dialog.component.scss']
})
export class DatePickerDialogComponent implements OnInit {
  data;
  selectedDateP;
  todayP;

  readonly daysOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];
  readonly daysOfWeekP = [
    'شنبه',
    'یک شنبه',
    'دو شنبه',
    'سه شنبه',
    'چهار شنبه',
    'پنج شنبه',
    'جمعه'
  ];
  readonly months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  readonly monthsP = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند'
  ];
  currMonth: number;
  currYear: number;
  currDay: number;
  firstDayOfMonth: number;
  lastDayOfMonth: number;
  lastDateOfMonth: number;
  lastDayOfLastMonth: number;
  weeksCount: number;
  weeks: any[][];
  currMonthP: number;
  currYearP: number;
  currDayP: number;
  firstDayOfMonthP: number;
  lastDayOfMonthP: number;
  lastDateOfMonthP: number;
  lastDayOfLastMonthP: number;
  weeksCountP: number;
  weeksP: any[][];

  constructor(
    private dialog: DialogRef,
    public config: DialogConfig
  ) {
    this.data = this.config.data;

    // const d = new Date();
    // this.currMonth = d.getMonth();
    // this.currYear = d.getFullYear();
    // this.currDay = d.getDate();
  }

  ngOnInit() {
    // this.showMonth();
    this.goToToday();
  }

  nextMonth() {
    if (this.currMonth === 11) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    } else {
      this.currMonth = this.currMonth + 1;
    }
    this.showMonth();
  }

  nextMonthP() {
    if (this.currMonthP === 12) {
      this.currMonthP = 1;
      this.currYearP = this.currYearP + 1;
    } else {
      this.currMonthP = this.currMonthP + 1;
    }
    this.showMonthP();
  }

  previousMonth() {
    if (this.currMonth === 0) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    } else {
      this.currMonth = this.currMonth - 1;
    }
    this.showMonth();
  }

  previousMonthP() {
    if (this.currMonthP === 1) {
      this.currMonthP = 12;
      this.currYearP = this.currYearP - 1;
    } else {
      this.currMonthP = this.currMonthP - 1;
    }
    this.showMonthP();
  }

  nextYearP() {
    this.currYearP = this.currYearP + 1;
    this.showMonthP();
  }

  previousYearP() {
    this.currYearP = this.currYearP - 1;
    this.showMonthP();
  }

  next10YearsP() {
    this.currYearP = this.currYearP + 10;
    this.showMonthP();
  }

  previous10YearsP() {
    this.currYearP = this.currYearP - 10;
    this.showMonthP();
  }

  goToToday(isPushed = false) {
    let dP = new jDate();
    let _dP = new jDate();
    if (this.data.date && !isPushed) {
      let temp = this.data.date;
      const y = temp.substr(0, temp.indexOf('/'));
      temp = temp.replace(y, '');
      const m = temp.substr(temp.indexOf('/') + 1, temp.lastIndexOf('/') - 1);
      temp = temp.replace(m, '').replace('/', '').replace('/', '');
      const d = temp.substr(0);
      dP.setFullYear(y);
      dP.setMonth(m);
      dP.setDate(d);

      this.selectedDateP = dP;
    }
    this.currMonthP = dP.getMonth();
    this.currYearP = dP.getFullYear();
    this.currDayP = dP.getDate();

    this.todayP = {
      d: _dP.getDate(),
      m: _dP.getMonth(),
      y: _dP.getFullYear()
    };

    this.showMonthP();
  }

  showMonth() {
    this.firstDayOfMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    this.lastDayOfMonth = new Date(this.currYear, this.currMonth + 1, 0).getDay();
    this.lastDateOfMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    this.lastDayOfLastMonth = this.currMonth === 0 ?
      new Date(this.currYear - 1, 11, 0).getDate() : new Date(this.currYear, this.currMonth, 0).getDate();
    this.weeksCount = (this.firstDayOfMonth + this.lastDateOfMonth + 6 - this.lastDayOfMonth) / 7;
    let k = 1;
    this.weeks = [];
    this.weeks[0] = [];
    for (let j = this.firstDayOfMonth; j < 7; j++) {
      this.weeks[0][j] = k++;
    }
    for (let i = 1; i < this.weeksCount - 1; i++) {
      this.weeks[i] = [];
      for (let j = 0; j < 7; j++) {
        this.weeks[i][j] = k++;
      }
    }
    this.weeks[this.weeks.length - 1] = [];
    for (let j = 0; j < 7; j++) {
      if (j >= this.lastDayOfMonth) {
        this.weeks[this.weeks.length - 1][j] = '';
      } else {
        this.weeks[this.weeks.length - 1][j] = k++;
      }
    }
  }

  showMonthP() {
    const a = new jDate();
    a.setFullYear(this.currYearP);
    a.setMonth(this.currMonthP);
    a.setDate(1);
    this.firstDayOfMonthP = a.getDay() + 1;
    if (this.firstDayOfMonthP > 6) { // TODO temp fix
      this.firstDayOfMonthP = 0;
    }
    const b = new jDate();
    b.setFullYear(this.currYearP);
    b.setMonth(this.currMonthP);
    b.setDate(b.daysInMonth());
    this.lastDayOfMonthP = b.getDay() + 1;
    if (this.lastDayOfMonthP > 6) { // TODO temp fix
      this.lastDayOfMonthP = 0;
    }
    const c = new jDate();
    c.setFullYear(this.currYearP);
    c.setMonth(this.currMonthP);
    this.lastDateOfMonthP = c.daysInMonth();
    const d = new jDate();
    d.setFullYear(this.currYearP - 1);
    d.setMonth(11);
    const _d = d.daysInMonth();
    const e = new jDate();
    e.setFullYear(this.currYearP);
    e.setMonth(this.currMonthP - 1);
    const _e = e.daysInMonth();
    this.lastDayOfLastMonthP = this.currMonthP === 1 ? _d : _e;
    this.weeksCountP = (this.firstDayOfMonthP + this.lastDateOfMonthP + 6 - this.lastDayOfMonthP) / 7;
    let k = 1;
    this.weeksP = [];
    this.weeksP[0] = [];
    let h = this.currMonthP === 1
      ? this.lastDayOfLastMonthP - this.firstDayOfMonthP :
      this.lastDayOfLastMonthP - this.firstDayOfMonthP + 1;
    for (let j = 0; j < this.firstDayOfMonthP; j++) {
      this.weeksP[0][j] = {
        d: h++,
        // m: this.currMonthP - 1,
        // y: this.currYearP,
        classList: 'not-current'
      };
    }
    for (let j = this.firstDayOfMonthP; j < 7; j++) {
      this.weeksP[0][j] = {
        d: k++,
        m: this.currMonthP,
        y: this.currYearP,
        classList: 'current'
      };
    }
    for (let i = 1; i < this.weeksCountP - 1; i++) {
      this.weeksP[i] = [];
      for (let j = 0; j < 7; j++) {
        this.weeksP[i][j] = {
          d: k++,
          m: this.currMonthP,
          y: this.currYearP,
          classList: 'current'
        };
      }
    }
    this.weeksP[this.weeksCountP - 1] = [];
    for (let j = 0; j <= this.lastDayOfMonthP; j++) {
      this.weeksP[this.weeksCountP - 1][j] = {
        d: k++,
        m: this.currMonthP,
        y: this.currYearP,
        classList: 'current'
      };
    }
    h = 1;
    for (let j = this.lastDayOfMonthP + 1; j < 7; j++) {
      this.weeksP[this.weeksCountP - 1][j] = {
        d: h++,
        // m: this.currMonthP,
        // y: this.currYearP,
        classList: 'not-current'
      };
    }
  }

  selectDateP(dateP) {
    if (dateP && dateP.classList.indexOf('not-current') === -1) {
      this.selectedDateP = dateP.d;
      this.done();
    }
    // alert(this.currYearP + '/' + this.currMonthP + '/' + this.selectedDateP);
  }

  done() {
    this.dialog.close(
      // this.selectedDateP
      this.currYearP + '/' + this.currMonthP + '/' + this.selectedDateP
    );
  }
  reject() {
    this.dialog.close(
      -1
    );
  }

}
