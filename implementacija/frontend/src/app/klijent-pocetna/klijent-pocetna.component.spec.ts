import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentPocetnaComponent } from './klijent-pocetna.component';

describe('KlijentPocetnaComponent', () => {
  let component: KlijentPocetnaComponent;
  let fixture: ComponentFixture<KlijentPocetnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlijentPocetnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlijentPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
