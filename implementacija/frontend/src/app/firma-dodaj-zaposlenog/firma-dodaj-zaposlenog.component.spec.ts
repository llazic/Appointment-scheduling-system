import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaDodajZaposlenogComponent } from './firma-dodaj-zaposlenog.component';

describe('FirmaDodajZaposlenogComponent', () => {
  let component: FirmaDodajZaposlenogComponent;
  let fixture: ComponentFixture<FirmaDodajZaposlenogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaDodajZaposlenogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaDodajZaposlenogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
