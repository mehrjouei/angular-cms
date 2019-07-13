import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPersonComponent } from './third-person.component';

describe('ThirdPersonComponent', () => {
  let component: ThirdPersonComponent;
  let fixture: ComponentFixture<ThirdPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
