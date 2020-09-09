import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaIzmeniUslugeZaposlenogComponent } from './firma-izmeni-usluge-zaposlenog.component';

describe('FirmaIzmeniUslugeZaposlenogComponent', () => {
  let component: FirmaIzmeniUslugeZaposlenogComponent;
  let fixture: ComponentFixture<FirmaIzmeniUslugeZaposlenogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaIzmeniUslugeZaposlenogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaIzmeniUslugeZaposlenogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
