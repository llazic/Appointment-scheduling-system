import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaPregledZaposlenihComponent } from './firma-pregled-zaposlenih.component';

describe('FirmaPregledZaposlenihComponent', () => {
  let component: FirmaPregledZaposlenihComponent;
  let fixture: ComponentFixture<FirmaPregledZaposlenihComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaPregledZaposlenihComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaPregledZaposlenihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
