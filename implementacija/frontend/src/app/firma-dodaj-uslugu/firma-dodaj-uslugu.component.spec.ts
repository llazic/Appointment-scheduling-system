import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaDodajUsluguComponent } from './firma-dodaj-uslugu.component';

describe('FirmaDodajUsluguComponent', () => {
  let component: FirmaDodajUsluguComponent;
  let fixture: ComponentFixture<FirmaDodajUsluguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaDodajUsluguComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaDodajUsluguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
