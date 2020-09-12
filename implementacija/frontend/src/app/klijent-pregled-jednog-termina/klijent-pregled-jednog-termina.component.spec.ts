import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentPregledJednogTerminaComponent } from './klijent-pregled-jednog-termina.component';

describe('KlijentPregledJednogTerminaComponent', () => {
  let component: KlijentPregledJednogTerminaComponent;
  let fixture: ComponentFixture<KlijentPregledJednogTerminaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentPregledJednogTerminaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlijentPregledJednogTerminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
