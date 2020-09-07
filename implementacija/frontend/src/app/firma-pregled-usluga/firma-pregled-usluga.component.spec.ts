import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaPregledUslugaComponent } from './firma-pregled-usluga.component';

describe('FirmaPregledUslugaComponent', () => {
  let component: FirmaPregledUslugaComponent;
  let fixture: ComponentFixture<FirmaPregledUslugaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaPregledUslugaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaPregledUslugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
