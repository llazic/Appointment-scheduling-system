import { Component, OnInit } from '@angular/core';
import { GostService } from '../gost.service';
import { Router } from '@angular/router';
import * as validacija from '../validacija';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private gostService: GostService, private router: Router) { }

  ngOnInit() {
  }

  poruka: string = '';
  ime: string = '';
  prezime: string = '';
  email: string = '';
  lozinka: string = '';

  registrujSe() {
    if (validacija.popunjenoSve([this.ime, this.prezime, this.email, this.lozinka]) == false) {
      this.poruka = 'Unesite sva polja.';
      return;
    }
    this.poruka = '';
    if (validacija.validirajEmail(this.email) === false) this.poruka += ' Email nije odgovarajućeg formata.';
    if (this.lozinka.length < 8) this.poruka += ' Lozinka mora imati bar 8 karaktera.';

    if (this.poruka !== '') return;

    this.gostService.registracijaKlijenta(this.ime, this.prezime, this.email, this.lozinka).subscribe((odgovor: any) => {
      if (odgovor.poruka) {
        this.poruka = odgovor.poruka;
        return;
      }

      alert('Registracija uspešna! Možete se prijaviti.');
      this.router.navigate(['/']);
    });
  }

}
