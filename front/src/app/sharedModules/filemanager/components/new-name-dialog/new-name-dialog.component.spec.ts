import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNameDialogComponent } from './new-name-dialog.component';

describe('NewNameDialogComponent', () => {
  let component: NewNameDialogComponent;
  let fixture: ComponentFixture<NewNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
