import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tabdion, Mode, Theme } from '../../../../viewModels/tabdion';

@Component({
  selector: 'app-edit-tabdion',
  templateUrl: './edit-tabdion.component.html',
  styleUrls: ['./edit-tabdion.component.scss']
})
export class EditTabdionComponent implements OnInit {
  @Input() data: any;
  @Output() dataChange = new EventEmitter<any>();

  currentItem: Tabdion;
  isEditMode = false;

  orientations = Mode;
  themes = Theme;

  overallModel: { index: number, title: string, icon: string, content: string };

  constructor() { }

  ngOnInit() {
  }

  onModeChange(mode) {
    this.data.data.mode = mode;
    this.dataChange.emit(this.data.data);
  }

  onThemeChange(theme) {
    this.data.data.theme = theme;
    this.dataChange.emit(this.data.data);
  }

  onTitleChange(title) {
    this.currentItem.title = title;
    this.dataChange.emit(this.data.data); // TODO
  }

  onIconChange(icon) {
    this.currentItem.icon = icon;
    this.dataChange.emit(this.data.data);
  }

  onContentChange(content) {
    this.currentItem.content = content;
    this.dataChange.emit(this.data.data);
  }

  onItemDelete(e, item) {
    this.data.data.items.splice(item.index, 1);
    this.dataChange.emit(this.data.data);
  }

  onItemUp(e, item) {
    if (item.index === 0) {
      return;
    }
    const prevItem = this.data.data.items.find(i => i.index === item.index - 1);
    prevItem.index++;
    item.index--;
    this.dataChange.emit(this.data.data);
  }

  onItemDown(e, item) {
    if (item.index === this.data.data.items.length - 1) {
      return;
    }
    const nextItem = this.data.data.items.find(i => i.index === item.index + 1);
    nextItem.index--;
    item.index++;
    this.dataChange.emit(this.data.data);
  }

  onItemEdit(e, item) {
    this.isEditMode = true;
    this.currentItem = item;
  }

  onItemAdd(e) {
    this.isEditMode = true;
    this.currentItem = new Tabdion();
    this.currentItem.index = +this.data.data.items.length;
    this.data.data.items.push(this.currentItem);
  }

  sort(a) {
    return a.sort((b, c) => (b.index > c.index) ? 1 : (b.index == c.index) ? 0 : -1);
  }
}
