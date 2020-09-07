import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { GostNavComponent } from './gost-nav/gost-nav.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RegistracijaFirmeComponent } from './registracija-firme/registracija-firme.component';
import { KlijentPocetnaComponent } from './klijent-pocetna/klijent-pocetna.component';
import { ZaposleniPocetnaComponent } from './zaposleni-pocetna/zaposleni-pocetna.component';
import { HttpClientModule } from '@angular/common/http';
import { FirmaNavComponent } from './firma-nav/firma-nav.component';
import { KlijentNavComponent } from './klijent-nav/klijent-nav.component';
import { ZaposleniNavComponent } from './zaposleni-nav/zaposleni-nav.component';
import { FirmaPregledZaposlenihComponent } from './firma-pregled-zaposlenih/firma-pregled-zaposlenih.component';
import { FirmaDodajZaposlenogComponent } from './firma-dodaj-zaposlenog/firma-dodaj-zaposlenog.component';
import { FirmaDodajUsluguComponent } from './firma-dodaj-uslugu/firma-dodaj-uslugu.component';
import { FirmaPregledUslugaComponent } from './firma-pregled-usluga/firma-pregled-usluga.component';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    GostNavComponent,
    RegistracijaComponent,
    RegistracijaFirmeComponent,
    KlijentPocetnaComponent,
    ZaposleniPocetnaComponent,
    FirmaNavComponent,
    KlijentNavComponent,
    ZaposleniNavComponent,
    FirmaPregledZaposlenihComponent,
    FirmaDodajZaposlenogComponent,
    FirmaDodajUsluguComponent,
    FirmaPregledUslugaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
