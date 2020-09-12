import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentPregledSvojihTerminaComponent } from './klijent-pregled-svojih-termina.component';

describe('KlijentPregledSvojihTerminaComponent', () => {
  let component: KlijentPregledSvojihTerminaComponent;
  let fixture: ComponentFixture<KlijentPregledSvojihTerminaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentPregledSvojihTerminaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlijentPregledSvojihTerminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
