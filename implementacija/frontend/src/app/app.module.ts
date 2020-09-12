import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { GostNavComponent } from './gost-nav/gost-nav.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RegistracijaFirmeComponent } from './registracija-firme/registracija-firme.component';
import { ZaposleniPocetnaComponent } from './zaposleni-pocetna/zaposleni-pocetna.component';
import { HttpClientModule } from '@angular/common/http';
import { FirmaNavComponent } from './firma-nav/firma-nav.component';
import { KlijentNavComponent } from './klijent-nav/klijent-nav.component';
import { ZaposleniNavComponent } from './zaposleni-nav/zaposleni-nav.component';
import { FirmaPregledZaposlenihComponent } from './firma-pregled-zaposlenih/firma-pregled-zaposlenih.component';
import { FirmaDodajZaposlenogComponent } from './firma-dodaj-zaposlenog/firma-dodaj-zaposlenog.component';
import { FirmaDodajUsluguComponent } from './firma-dodaj-uslugu/firma-dodaj-uslugu.component';
import { FirmaPregledUslugaComponent } from './firma-pregled-usluga/firma-pregled-usluga.component';
import { ZaposleniPromeniLozinkuComponent } from './zaposleni-promeni-lozinku/zaposleni-promeni-lozinku.component';
import { FirmaIzmeniUslugeZaposlenogComponent } from './firma-izmeni-usluge-zaposlenog/firma-izmeni-usluge-zaposlenog.component';
import { FirmaDodeliRadnoVremeComponent } from './firma-dodeli-radno-vreme/firma-dodeli-radno-vreme.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { KlijentPretragaComponent } from './klijent-pretraga/klijent-pretraga.component';
import { KlijentPregledFirmeComponent } from './klijent-pregled-firme/klijent-pregled-firme.component';
import { KlijentZakazivanjeComponent } from './klijent-zakazivanje/klijent-zakazivanje.component';
import { KlijentPregledSvojihTerminaComponent } from './klijent-pregled-svojih-termina/klijent-pregled-svojih-termina.component';
import { KlijentPregledJednogTerminaComponent } from './klijent-pregled-jednog-termina/klijent-pregled-jednog-termina.component';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    GostNavComponent,
    RegistracijaComponent,
    RegistracijaFirmeComponent,
    ZaposleniPocetnaComponent,
    FirmaNavComponent,
    KlijentNavComponent,
    ZaposleniNavComponent,
    FirmaPregledZaposlenihComponent,
    FirmaDodajZaposlenogComponent,
    FirmaDodajUsluguComponent,
    FirmaPregledUslugaComponent,
    ZaposleniPromeniLozinkuComponent,
    FirmaIzmeniUslugeZaposlenogComponent,
    FirmaDodeliRadnoVremeComponent,
    KlijentPretragaComponent,
    KlijentPregledFirmeComponent,
    KlijentZakazivanjeComponent,
    KlijentPregledSvojihTerminaComponent,
    KlijentPregledJednogTerminaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
