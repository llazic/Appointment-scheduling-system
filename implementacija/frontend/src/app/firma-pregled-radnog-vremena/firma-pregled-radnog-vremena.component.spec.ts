import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaPregledRadnogVremenaComponent } from './firma-pregled-radnog-vremena.component';

describe('FirmaPregledRadnogVremenaComponent', () => {
  let component: FirmaPregledRadnogVremenaComponent;
  let fixture: ComponentFixture<FirmaPregledRadnogVremenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmaPregledRadnogVremenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaPregledRadnogVremenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
