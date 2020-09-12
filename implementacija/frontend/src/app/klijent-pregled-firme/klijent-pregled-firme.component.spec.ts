import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentPregledFirmeComponent } from './klijent-pregled-firme.component';

describe('KlijentPregledFirmeComponent', () => {
  let component: KlijentPregledFirmeComponent;
  let fixture: ComponentFixture<KlijentPregledFirmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentPregledFirmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlijentPregledFirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
