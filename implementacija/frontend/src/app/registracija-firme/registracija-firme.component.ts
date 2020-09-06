import { Component, OnInit } from '@angular/core';
import { GostService } from '../gost.service';
import { Router } from '@angular/router';
import * as validacija from '../validacija';

@Component({
  selector: 'app-registracija-firme',
  templateUrl: './registracija-firme.component.html',
  styleUrls: ['./registracija-firme.component.css']
})
export class RegistracijaFirmeComponent implements OnInit {

  constructor(private gostService: GostService, private router: Router) { }

  ngOnInit() {
  }

  poruka: string = '';
  naziv: string = '';
  opis: string = '';
  email: string = '';
  lozinka: string = '';
  adresa: string = '';

  registrujFirmu() {
    if (validacija.popunjenoSve([this.naziv, this.opis, this.email, this.lozinka, this.adresa]) == false) {
      this.poruka = 'Unesite sva polja.';
      window.scrollTo(0, 0);
      return;
    }
    this.poruka = '';
    if (validacija.validirajEmail(this.email) === false) this.poruka += ' Email nije odgovarajućeg formata.';
    if (this.lozinka.length < 8) this.poruka += ' Lozinka mora imati bar 8 karaktera.';

    if (this.poruka !== '') return;

    this.gostService.registracijaFirme(this.naziv, this.opis, this.email, this.lozinka, this.adresa).subscribe((odgovor: any) => {
      if (odgovor.poruka) {
        this.poruka = odgovor.poruka;
        window.scrollTo(0, 0);
        return;
      }

      alert('Registracija uspešna! Možete se prijaviti.');
      this.router.navigate(['/']);
    });
  }

}
