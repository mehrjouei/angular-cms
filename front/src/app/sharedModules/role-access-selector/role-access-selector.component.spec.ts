import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAccessSelectorComponent } from './role-access-selector.component';

describe('RoleAccessSelectorComponent', () => {
  let component: RoleAccessSelectorComponent;
  let fixture: ComponentFixture<RoleAccessSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAccessSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAccessSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
