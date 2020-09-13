import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RegistracijaFirmeComponent } from './registracija-firme/registracija-firme.component';
import { ZaposleniPocetnaComponent } from './zaposleni-pocetna/zaposleni-pocetna.component';
import { FirmaDodajZaposlenogComponent } from './firma-dodaj-zaposlenog/firma-dodaj-zaposlenog.component';
import { FirmaPregledZaposlenihComponent } from './firma-pregled-zaposlenih/firma-pregled-zaposlenih.component';
import { FirmaDodajUsluguComponent } from './firma-dodaj-uslugu/firma-dodaj-uslugu.component';
import { FirmaPregledUslugaComponent } from './firma-pregled-usluga/firma-pregled-usluga.component';
import { FirmaIzmeniUslugeZaposlenogComponent } from './firma-izmeni-usluge-zaposlenog/firma-izmeni-usluge-zaposlenog.component';
import { FirmaDodeliRadnoVremeComponent } from './firma-dodeli-radno-vreme/firma-dodeli-radno-vreme.component';
import { KlijentPretragaComponent } from './klijent-pretraga/klijent-pretraga.component';
import { KlijentPregledFirmeComponent } from './klijent-pregled-firme/klijent-pregled-firme.component';
import { KlijentZakazivanjeComponent } from './klijent-zakazivanje/klijent-zakazivanje.component';
import { KlijentPregledSvojihTerminaComponent } from './klijent-pregled-svojih-termina/klijent-pregled-svojih-termina.component';
import { KlijentPregledJednogTerminaComponent } from './klijent-pregled-jednog-termina/klijent-pregled-jednog-termina.component';
import { FirmaPregledRadnogVremenaComponent } from './firma-pregled-radnog-vremena/firma-pregled-radnog-vremena.component';


const routes: Routes = [
  { path: '', component: PrijavaComponent },
  { path: 'firma/dodaj/usluga', component: FirmaDodajUsluguComponent },
  { path: 'firma/dodaj/zaposleni', component: FirmaDodajZaposlenogComponent },
  { path: 'firma/zaposleni/radno_vreme', component: FirmaPregledRadnogVremenaComponent },
  { path: 'firma/zaposleni/dodeli_radno_vreme', component: FirmaDodeliRadnoVremeComponent },
  { path: 'firma/pocetna', component: FirmaPregledZaposlenihComponent },
  { path: 'firma/zaposleni', component: FirmaPregledZaposlenihComponent },
  { path: 'firma/zaposleni/usluge', component: FirmaIzmeniUslugeZaposlenogComponent },
  { path: 'firma/usluge', component: FirmaPregledUslugaComponent },
  { path: 'klijent/pocetna', component: KlijentPretragaComponent },
  { path: 'klijent/firma', component: KlijentPregledFirmeComponent },
  { path: 'klijent/zakazi', component: KlijentZakazivanjeComponent },
  { path: 'klijent/termin', component: KlijentPregledJednogTerminaComponent },
  { path: 'klijent/termini', component: KlijentPregledSvojihTerminaComponent },
  { path: 'registracija/klijent', component: RegistracijaComponent },
  { path: 'registracija/firma', component: RegistracijaFirmeComponent },
  { path: 'zaposleni/pocetna', component: ZaposleniPocetnaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
