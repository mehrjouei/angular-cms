import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Tabdion, Mode } from '../../../../viewModels/tabdion';

@Component({
  selector: 'app-tabdion',
  templateUrl: './tabdion.component.html',
  styleUrls: ['./tabdion.component.scss'],
  animations: [
    trigger('tabAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class TabdionComponent implements OnInit {
  modes = Mode;
  selected: Tabdion;

  @Input() data: { mode: Mode, theme: string, items: Tabdion[] };

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (!this.data) {
      this.data = { mode: Mode.horizontal, theme: 'default', items: [] };
    }
    if (this.data.items.length) {
      this.selected = this.data.items[0];
    }
  }

  onSelect(event, tabdion: Tabdion) {
    this.selected = this.data.items.find(t => t.index === tabdion.index);
  }

  getContent(index) {
    const content = this.data.items.find(t => t.index === index).content;
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
