import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RegistracijaFirmeComponent } from './registracija-firme/registracija-firme.component';
import { FirmaPocetnaComponent } from './firma-pocetna/firma-pocetna.component';
import { KlijentPocetnaComponent } from './klijent-pocetna/klijent-pocetna.component';
import { ZaposleniPocetnaComponent } from './zaposleni-pocetna/zaposleni-pocetna.component';


const routes: Routes = [
  { path:'', component: PrijavaComponent },
  { path:'firma/pocetna', component: FirmaPocetnaComponent},
  { path:'klijent/pocetna', component: KlijentPocetnaComponent},
  { path:'registracija/klijent', component: RegistracijaComponent },
  { path:'registracija/firma', component: RegistracijaFirmeComponent},
  { path:'zaposleni/pocetna', component: ZaposleniPocetnaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
