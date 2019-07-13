import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, animate } from '@angular/animations';

@Component({
  selector: 'app-custom-product',
  templateUrl: './custom-product.component.html',
  styleUrls: ['./custom-product.component.scss'],
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
export class CustomProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }

}
