import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabdionComponent } from './tabdion.component';

describe('TabdionComponent', () => {
  let component: TabdionComponent;
  let fixture: ComponentFixture<TabdionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabdionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabdionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
