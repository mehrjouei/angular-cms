import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.scss']
})
export class InsurancesComponent {
  @Input() insuranceTypes;
  insurances = [
    {
      name: 'thirdperson',
      image: '/assets/images/insurances/thirdperson.jpg',
      url: '/product/thirdPerson/',
      disable: false
    },
    {
      name: 'fire',
      image: '/assets/images/insurances/fire.jpg',
      url: '',
      disable: true
    },
    {
      name: 'pezeshki',
      image: '/assets/images/insurances/pezeshki.jpg',
      url: '',
      disable: true
    },
    {
      name: 'travel',
      image: '/assets/images/insurances/travel.jpg',
      url: '/product/travel',
      disable: false,
    },
    {
      name: 'omr',
      image: '/assets/images/insurances/omr.jpg',
      url: '',
      disable: true
    },
    {
      name: 'mobile',
      image: '/assets/images/insurances/mobile.jpg',
      url: '',
      disable: true
    },
    {
      name: 'elevator',
      image: '/assets/images/insurances/elevator.jpg',
      url: '',
      disable: true
    },
    {
      name: 'personal',
      image: '/assets/images/insurances/personal.jpg',
      url: '',
      disable: true
    }
  ];
  constructor(
  ) { }

  ngOnChanges() {
    console.log(this.insuranceTypes);
    for (const i of this.insuranceTypes) {
      let m = this.insurances.find(x => x.name === i.moduleName);
      if (m != undefined) {
        if (m) {
          m.disable = false;
        } else {
          m.disable = true;
        }
        if (m.name !== 'travel' && m.name !== 'thirdperson') {
          m.url = '/product/custom-product/filter/' + i.moduleName + '/' + i.id
        }
      }

    }
  }
  url(i) {
    if (i.name == 'thirdperson') {
      return i.url;
    }
    else if (i.name == 'travel') {
      return i.url;
    }
    else {
      return i.url;
    }
  }

}
