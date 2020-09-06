import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GostNavComponent } from './gost-nav.component';

describe('GostNavComponent', () => {
  let component: GostNavComponent;
  let fixture: ComponentFixture<GostNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GostNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GostNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
