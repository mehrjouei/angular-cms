import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width: '100%',
            left: '-100%',
            // transform: 'translateX(-100%)'
          }),
          { optional: true }),

        // move page off screen right on leave
        query(':leave',
          animate('350ms ease',
            style({
              position: 'fixed',
              width: '100%',
              left: '100%'
              // transform: 'translateX(100%)'
            })
          ),
          { optional: true }),

        // move page in screen from left to right
        query(':enter',
          animate('350ms ease',
            style({
              opacity: 1,
              left: '0'
              // transform: 'translateX(0%)'
            })
          ),
          { optional: true }),
      ])
    ])
  ]
})
export class TravelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }

}
