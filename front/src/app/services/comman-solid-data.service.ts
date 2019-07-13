import { Injectable } from '@angular/core';
import { PersianCalendarService } from './jalaliDate.service';
import { InsuranceType } from '../viewModels/insuranceType.model';

@Injectable()
export class CommanSolidDataService {

  constructor(
    private jalali: PersianCalendarService

  ) { }
  getDays() {
    return [
      {
        text: "01",
        value: "01"
      },
      {
        text: "02",
        value: "02"
      },
      {
        text: "03",
        value: "03"
      },
      {
        text: "04",
        value: "04"
      },
      {
        text: "05",
        value: "05"
      },
      {
        text: "06",
        value: "06"
      },
      {
        text: "07",
        value: "07"
      },
      {
        text: "08",
        value: "08"
      },
      {
        text: "09",
        value: "09"
      },
      {
        text: "10",
        value: "10"
      },
      {
        text: "11",
        value: "11"
      },
      {
        text: "12",
        value: "12"
      },
      {
        text: "13",
        value: "13"
      },
      {
        text: "14",
        value: "14"
      },
      {
        text: "15",
        value: "15"
      },
      {
        text: "16",
        value: "16"
      },
      {
        text: "17",
        value: "17"
      },
      {
        text: "18",
        value: "18"
      },
      {
        text: "19",
        value: "19"
      },
      {
        text: "20",
        value: "20"
      },
      {
        text: "21",
        value: "21"
      },
      {
        text: "22",
        value: "22"
      },
      {
        text: "23",
        value: "23"
      },
      {
        text: "24",
        value: "24"
      },
      {
        text: "25",
        value: "25"
      },
      {
        text: "26",
        value: "26"
      },
      {
        text: "27",
        value: "27"
      },
      {
        text: "28",
        value: "28"
      },
      {
        text: "29",
        value: "29"
      },
      {
        text: "30",
        value: "30"
      },
      {
        text: "31",
        value: "31"
      },
    ]
  }
  getMonths() {
    return [
      {
        text: "فروردین",
        value: "01"
      },
      {
        text: "اردیبهشت",
        value: "02"
      },
      {
        text: "خرداد",
        value: "03"
      },
      {
        text: "تیر",
        value: "04"
      },
      {
        text: "مرداد",
        value: "05"
      },
      {
        text: "شهریور",
        value: "06"
      },
      {
        text: "مهر",
        value: "07"
      },
      {
        text: "آبان",
        value: "08"
      },
      {
        text: "آذر",
        value: "09"
      },
      {
        text: "دی",
        value: "10"
      },
      {
        text: "بهمن",
        value: "11"
      },
      {
        text: "اسفند",
        value: "12"
      },
    ]
  }
  getYears() {
    let years = [];
    let currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 15);
    let currentJalaliYear = +(this.jalali.PersianCalendarDate(currentDate).split("/")[0]);

    for (let i = currentJalaliYear; i > (currentJalaliYear - 120); i--)
      years.push({
        text: i + "",
        value: i
      })
    return years;
  }
  getFutureYears() {
    let years = [];
    let currentDate = new Date();
    let currentJalaliYear = +(this.jalali.PersianCalendarDate(currentDate).split("/")[0]);

    for (let i = currentJalaliYear + 10; i >= (currentJalaliYear); i--)
      years.push({
        text: i + "",
        value: i
      })
    return years;
  }

  getDamages() {
    return [
      {
        id: 0,
        text: "ندارم",
        value: 0
      },
      {
        id: 1,
        text: "یک بار",
        value: 1
      },
      {
        id: 2,
        text: "دو بار",
        value: 2
      },
      {
        id: 3,
        text: "سه بار و بیشتر",
        value: 3
      },

    ]
  }
  getSafePeriods() {
    return [
      {
        id: 0,
        text: "ندارم",
        value: 0
      },
      {
        id: 1,
        text: "یک سال",
        value: 1
      },
      {
        id: 2,
        text: "دو سال",
        value: 2
      },
      {
        id: 3,
        text: "سه سال",
        value: 3
      },
      {
        id: 4,
        text: "چهار سال",
        value: 4
      },
      {
        id: 5,
        text: "پنج سال",
        value: 5
      },
      {
        id: 6,
        text: "شش سال",
        value: 6
      },
      {
        id: 7,
        text: "هفت سال",
        value: 7
      },
      {
        id: 8,
        text: "هشت سال",
        value: 8
      },
      {
        id: 9,
        text: "نه سال",
        value: 9
      },
      {
        id: 10,
        text: "ده سال",
        value: 10
      },
      {
        id: 11,
        text: "یازده سال",
        value: 11
      },
      {
        id: 12,
        text: "دوازده سال",
        value: 13
      },
      {
        id: 13,
        text: "سیزده سال",
        value: 13
      },
      {
        id: 14,
        text: "چهارده سال",
        value: 14
      },
    ]
  }
  getGenderTypes() {
    return [
      {
        text: 'مرد',
        value: 0
      },
      {
        text: 'زن',
        value: 1
      }
    ]
  }
  getBankList() {
    return [
      {
        bankEnName: "eghtesad-novin",
        bankFaName: "اقتصاد نوین",
        bankIbanCode: "055"
      },
      {
        bankEnName: "parsian",
        bankFaName: "پارسیان",
        bankIbanCode: "054"
      },
      {
        bankEnName: "pasargad",
        bankFaName: "پاسارگاد",
        bankIbanCode: "057"
      },
      {
        bankEnName: "postbank",
        bankFaName: "پست بانک ایران",
        bankIbanCode: "021"
      },
      {
        bankEnName: "tejarat",
        bankFaName: "تجارت",
        bankIbanCode: "018"
      },
      {
        bankEnName: "toseh-saderat",
        bankFaName: "توسعه صادرات",
        bankIbanCode: "020"
      },
      {
        bankEnName: "saderat",
        bankFaName: "صادرات",
        bankIbanCode: "019"
      },
      {
        bankEnName: "refah",
        bankFaName: "رفاه",
        bankIbanCode: "013"
      },
      {
        bankEnName: "saman",
        bankFaName: "سامان",
        bankIbanCode: "056"
      },
      {
        bankEnName: "sepah",
        bankFaName: "سپه",
        bankIbanCode: "015"
      },
      {
        bankEnName: "sarmayeh",
        bankFaName: "سرمایه",
        bankIbanCode: "058"
      },
      {
        bankEnName: "sanat-madan",
        bankFaName: "صنعت و معدن",
        bankIbanCode: "011"
      },
      {
        bankEnName: "karafarin",
        bankFaName: "کارآفرین",
        bankIbanCode: "053"
      },
      {
        bankEnName: "keshavarzi",
        bankFaName: "کشاورزی",
        bankIbanCode: "016"
      },
      {
        bankEnName: "markazi",
        bankFaName: "مرکزی",
        bankIbanCode: "010"
      },
      {
        bankEnName: "maskan",
        bankFaName: "مسکن",
        bankIbanCode: "014"
      },
      {
        bankEnName: "mellat",
        bankFaName: "ملت",
        bankIbanCode: "012"
      },
      {
        bankEnName: "melli",
        bankFaName: "ملی ایران",
        bankIbanCode: "017"
      },
      {
        bankEnName: "resalat",
        bankFaName: "قرض الحسنه رسالت",
        bankIbanCode: "070"
      },
      {
        bankEnName: "ayandeh",
        bankFaName: "آینده",
        bankIbanCode: "062"
      },
      {
        bankEnName: "shahr",
        bankFaName: "شهر",
        bankIbanCode: "061"
      },
      {
        bankEnName: "sina",
        bankFaName: "سینا",
        bankIbanCode: "059"
      },
      {
        bankEnName: "mehr",
        bankFaName: "مهر ایران",
        bankIbanCode: "060"
      },
      {
        bankEnName: "toseh",
        bankFaName: "اعتباری توسعه",
        bankIbanCode: "051"
      },
      {
        bankEnName: "ansar",
        bankFaName: "انصار",
        bankIbanCode: "063"
      },
      {
        bankEnName: "dey",
        bankFaName: "دی",
        bankIbanCode: "066"
      },
      {
        bankEnName: "hekmat",
        bankFaName: "حکمت ایرانیان",
        bankIbanCode: "065"
      },
      {
        bankEnName: "iranzamin",
        bankFaName: "ایران زمین",
        bankIbanCode: "069"
      },
      {
        bankEnName: "gardeshgari",
        bankFaName: "گردشگری",
        bankIbanCode: "064"
      },
      {
        bankEnName: "ghavamin",
        bankFaName: "قوامین",
        bankIbanCode: "052"
      },
      {
        bankEnName: "khavarmianeh",
        bankFaName: "خاورمیانه",
        bankIbanCode: "078"
      },
      {
        bankEnName: "kosar",
        bankFaName: "اعتباری کوثر",
        bankIbanCode: "073"
      },
      {
        bankEnName: "melal",
        bankFaName: "اعتباری ملل",
        bankIbanCode: "075"
      },
      {
        bankEnName: "noor",
        bankFaName: "اعتباری نور",
        bankIbanCode: "080"
      },

    ]
  }
  // getInsuranceTypes(): InsuranceType[] {
  //   return [
  //     {
  //       id: 1,
  //       description: "بیمه شخص ثالث",
  //       title: "شخص ثالث",
  //       moduleName: "thirdperson",
  //       icon: "thirdperson.jpg",
  //       disabled: true,
  //     },
  //     {
  //       id: null,
  //       description: "بیمه عمر",
  //       title: "عمر",
  //       moduleName: "omr",
  //       icon: "omr.jpg",
  //       disabled: true,
  //     },
  //     {
  //       id: null,
  //       description: "بیمه مسافرت",
  //       title: "مسافرت",
  //       moduleName: "travel",
  //       icon: "travel.jpg",
  //       disabled: true,
  //     },
  //     {
  //       id: null,
  //       description: "بیمه آتش سوزی",
  //       title: "آتش سوزی",
  //       moduleName: "fire",
  //       icon: "fire.jpg",
  //       disabled: true,
  //     },
  //     {
  //       id: null,
  //       description: "بیمه بدنه",
  //       title: "بدنه",
  //       moduleName: "badane",
  //       icon: "badane.jpg",
  //       disabled: true,
  //     },
  //     {
  //       id: null,
  //       description: "بیمه زلزله",
  //       title: "زلزله",
  //       moduleName: "zamin",
  //       icon: "zamin.jpg",
  //       disabled: true,
  //     },
  //   ];
  // }
  getOrderStates(): any[] {
    return [
      {
        title: "new",
        id: 1,
        faTitle: "بیمه نامه ناتمام"
      },
      {
        title: "paid",
        id: 2,
        faTitle: "بیمه نامه ناتمام"
      },
      {
        title: "hasbuyeraddress",
        id: 4,
        faTitle: "بیمه نامه ناتمام"
      },
      {
        title: "incompletepaid",
        id: 3,
        faTitle: "مغایرت در پرداخت"
      },
      {
        title: "hasinsureraddress",
        id: 5,
        faTitle: "بیمه نامه ناتمام"
      },
      {
        title: "hasdocument",
        id: 6,
        faTitle: "بیمه نامه ناتمام"
      },
      {
        title: "informationdefect",
        id: 7,
        faTitle: "نقص مدارک"
      },
      {
        title: "submitted",
        id: 8,
        faTitle: "درحال پیگیری"
      },
      {
        title: "issued",
        id: 9,
        faTitle: "صادر شده"
      },
      {
        title: "shipped",
        id: 10,
        faTitle: "ارسال شد"
      },
      {
        title: "delivered",
        id: 11,
        faTitle: "تحویل شد"
      },
      {
        title: "cancelledbyagent",
        id: 12,
        faTitle: "عدم امکان صدور"
      },

      {
        title: "refunded",
        id: 15,
        faTitle: "مبلغ برگشت داده شده"
      },
      {
        title: "getbyagent",
        id: 16,
        faTitle:"درحال بررسی"
      },
    ]
  }

}
