import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaDodeliRadnoVremeComponent } from './firma-dodeli-radno-vreme.component';

describe('FirmaDodeliRadnoVremeComponent', () => {
  let component: FirmaDodeliRadnoVremeComponent;
  let fixture: ComponentFixture<FirmaDodeliRadnoVremeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaDodeliRadnoVremeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaDodeliRadnoVremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
