import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentPretragaComponent } from './klijent-pretraga.component';

describe('KlijentPretragaComponent', () => {
  let component: KlijentPretragaComponent;
  let fixture: ComponentFixture<KlijentPretragaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentPretragaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlijentPretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
