import { Component, OnInit } from '@angular/core';
import { FirmaService } from '../firma.service';
import * as validacija from '../validacija';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firma-dodaj-zaposlenog',
  templateUrl: './firma-dodaj-zaposlenog.component.html',
  styleUrls: ['./firma-dodaj-zaposlenog.component.css']
})
export class FirmaDodajZaposlenogComponent implements OnInit {

  constructor(private firmaService: FirmaService, private router: Router) { }

  ngOnInit() {
    this.firma = JSON.parse(localStorage.getItem('korisnik'));
    this.firmaService.dohvatiUsluge(this.firma._id).subscribe((odgovor : any) => {
      this.sveUsluge = odgovor;
      this.odabraneUsluge = [];
    })
  }

  firma;
  sveUsluge = [];

  poruka: string = '';

  ime: string = '';
  prezime: string = '';
  email: string = '';
  odabraneUsluge : any;

  kliknutCheckbox(usluga_id : string, uslugaOdabrana : boolean) {
    if (uslugaOdabrana) this.odabraneUsluge.push(usluga_id);
    else {
      const index = this.odabraneUsluge.indexOf(usluga_id);
      if (index > -1) this.odabraneUsluge.splice(index, 1);
    }
  }

  dodajZaposlenog() {
    if (validacija.popunjenoSve([this.ime, this.prezime, this.email]) === false ) return this.poruka = 'Unesite sva polja.';

    this.poruka = ''
    if (validacija.validirajEmail(this.email) === false) this.poruka += ' Email nije odgovarajućeg formata.';

    if (this.poruka !== '') return;

    this.firmaService.dodajZaposlenog(this.ime, this.prezime, this.email, this.firma._id, this.odabraneUsluge).subscribe((odgovor : any) => {
      if (odgovor.poruka) return this.poruka = odgovor.poruka;

      alert('Uspešno ste dodali zaposlenog!');
      this.router.navigate(['/firma/zaposleni']);
    });
  }
}
