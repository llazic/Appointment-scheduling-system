import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentZakazivanjeComponent } from './klijent-zakazivanje.component';

describe('KlijentZakazivanjeComponent', () => {
  let component: KlijentZakazivanjeComponent;
  let fixture: ComponentFixture<KlijentZakazivanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentZakazivanjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlijentZakazivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
