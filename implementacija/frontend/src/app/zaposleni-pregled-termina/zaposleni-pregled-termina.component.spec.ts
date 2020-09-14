import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPregledTerminaComponent } from './zaposleni-pregled-termina.component';

describe('ZaposleniPregledTerminaComponent', () => {
  let component: ZaposleniPregledTerminaComponent;
  let fixture: ComponentFixture<ZaposleniPregledTerminaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPregledTerminaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPregledTerminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
