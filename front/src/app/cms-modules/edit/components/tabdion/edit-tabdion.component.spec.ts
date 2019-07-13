import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTabdionComponent } from './edit-tabdion.component';

describe('EditTabdionComponent', () => {
  let component: EditTabdionComponent;
  let fixture: ComponentFixture<EditTabdionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTabdionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTabdionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
