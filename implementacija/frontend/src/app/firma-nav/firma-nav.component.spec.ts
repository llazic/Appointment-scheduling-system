import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaNavComponent } from './firma-nav.component';

describe('FirmaNavComponent', () => {
  let component: FirmaNavComponent;
  let fixture: ComponentFixture<FirmaNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
