import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniNavComponent } from './zaposleni-nav.component';

describe('ZaposleniNavComponent', () => {
  let component: ZaposleniNavComponent;
  let fixture: ComponentFixture<ZaposleniNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaposleniNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
