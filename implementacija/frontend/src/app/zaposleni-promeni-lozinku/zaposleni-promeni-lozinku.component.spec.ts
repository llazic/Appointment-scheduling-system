import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPromeniLozinkuComponent } from './zaposleni-promeni-lozinku.component';

describe('ZaposleniPromeniLozinkuComponent', () => {
  let component: ZaposleniPromeniLozinkuComponent;
  let fixture: ComponentFixture<ZaposleniPromeniLozinkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaposleniPromeniLozinkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPromeniLozinkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
