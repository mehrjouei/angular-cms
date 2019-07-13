import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMapDialogComponent } from './role-map-dialog.component';

describe('RoleMapDialogComponent', () => {
  let component: RoleMapDialogComponent;
  let fixture: ComponentFixture<RoleMapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleMapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
