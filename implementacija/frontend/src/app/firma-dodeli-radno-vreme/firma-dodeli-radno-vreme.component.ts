import { Component, OnInit } from '@angular/core';
import * as validacija from '../validacija';
import { FirmaService } from '../firma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firma-dodeli-radno-vreme',
  templateUrl: './firma-dodeli-radno-vreme.component.html',
  styleUrls: ['./firma-dodeli-radno-vreme.component.css']
})
export class FirmaDodeliRadnoVremeComponent implements OnInit {

  constructor(private firmaService : FirmaService, private router : Router) { }

  ngOnInit() {
    this.firma = JSON.parse(localStorage.getItem('korisnik'));
    this.zaposleni = JSON.parse(localStorage.getItem('zaposleni'));
    this.popuniNizove();
  }

  poruka: string = '';
  firma;
  zaposleni;

  dani = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
  odabraniRadniDani = [false, false, false, false, false, false, false];
  sati = [];
  minuti = ['00', '10', '20', '30', '40', '50'];

  datumOd; datumDo;

  satOd: any = 'Sati'; minutOd: any = 'Minuta';
  satDo: any = 'Sati'; minutDo: any = 'Minuta';

  popuniNizove() {
    for (let i = 0; i < 24; i++) this.sati.push(i < 10 ? '0' + i : '' + i);
  }

  korak = 1;

  sledeciKorak() {
    this.poruka = '';
    let ret;
    switch (this.korak) {
      case 1:
        if (this.datumiOk() !== true) return;
        this.korak++;
        break;
      case 2:
        if(this.vremeOk() !== true) return;
        this.korak++;
        break;
      case 3:
        if (this.odabraniRadniDani.includes(true) == false) return this.poruka = 'Odaberite radne dane.';

        this.korak++;
        break;
    }
  }

  prethodniKorak() {
    this.korak--;
  }

  potvrdi() {
    let satOd = Number(this.satOd); let minutOd = Number(this.minutOd);
    let satDo = Number(this.satDo); let minutDo = Number(this.minutDo);
    let vremeOd = satOd * 60 + minutOd;
    let vremeDo = satDo * 60 + minutDo;
    this.firmaService.dodajRadnoVreme(this.zaposleni._id, this.datumOd, this.datumDo, vremeOd, vremeDo, this.odabraniRadniDani).subscribe((odgovor: any) => {
      if (odgovor.poruka) return this.poruka = odgovor.poruka;

      if (odgovor.info) alert(odgovor.info);
      else alert('Uspešno ste dodelili radno vreme.');

      this.router.navigate(['/firma/zaposleni']);
    });
  }

  datumiOk() {
    if (validacija.popunjenoSve([this.datumOd, this.datumDo]) == false) return this.poruka = 'Unesite sva polja.';

    if (this.datumOd == 'Invalid Date' || this.datumDo == 'Invalid Date') return this.poruka = 'Unesite ispravne datume u formatu Mesec/Dan/Godina.';

    let sada = new Date();
    if (this.datumOd > this.datumDo) return this.poruka = 'Unesite ispravne datume važenja.';
    if (this.datumOd < sada) return this.poruka = 'Datumi moraju biti u budućnosti.';
    return true;
  }

  vremeOk() {
    if (this.unetoVreme([this.satOd, this.satDo, this.minutOd, this.minutDo]) == false) return this.poruka = 'Unesite sva polja.';
    let satOd = Number(this.satOd); let minutOd = Number(this.minutOd);
    let satDo = Number(this.satDo); let minutDo = Number(this.minutDo);
    let vremeOdMin = satOd * 60 + minutOd;
    let vremeDoMin = satDo * 60 + minutDo;
    if (vremeOdMin >= vremeDoMin) return this.poruka = 'Unesite ispravno radno vreme.';
    return true;
  }

  unetoVreme(vremena) {
    for (let v of vremena) {
      if (v == 'Sati' || v == 'Minuta') return false;
    }
    return true;
  }
}
