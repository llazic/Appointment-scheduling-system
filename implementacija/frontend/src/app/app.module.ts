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
import { FirmaPocetnaComponent } from './firma-pocetna/firma-pocetna.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    GostNavComponent,
    RegistracijaComponent,
    RegistracijaFirmeComponent,
    KlijentPocetnaComponent,
    ZaposleniPocetnaComponent,
    FirmaPocetnaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
