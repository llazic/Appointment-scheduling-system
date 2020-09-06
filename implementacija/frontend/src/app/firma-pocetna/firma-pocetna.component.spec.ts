import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaPocetnaComponent } from './firma-pocetna.component';

describe('FirmaPocetnaComponent', () => {
  let component: FirmaPocetnaComponent;
  let fixture: ComponentFixture<FirmaPocetnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaPocetnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
