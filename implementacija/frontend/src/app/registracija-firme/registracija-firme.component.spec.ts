import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaFirmeComponent } from './registracija-firme.component';

describe('RegistracijaFirmeComponent', () => {
  let component: RegistracijaFirmeComponent;
  let fixture: ComponentFixture<RegistracijaFirmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistracijaFirmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaFirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
