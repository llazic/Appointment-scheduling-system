import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPocetnaComponent } from './zaposleni-pocetna.component';

describe('ZaposleniPocetnaComponent', () => {
  let component: ZaposleniPocetnaComponent;
  let fixture: ComponentFixture<ZaposleniPocetnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaposleniPocetnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
