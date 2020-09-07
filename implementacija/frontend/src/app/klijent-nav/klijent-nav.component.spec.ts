import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentNavComponent } from './klijent-nav.component';

describe('KlijentNavComponent', () => {
  let component: KlijentNavComponent;
  let fixture: ComponentFixture<KlijentNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlijentNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlijentNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
