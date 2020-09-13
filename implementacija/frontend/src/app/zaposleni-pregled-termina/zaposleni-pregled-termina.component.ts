import { Component, OnInit } from '@angular/core';
import { ZaposleniService } from '../zaposleni.service';
import { Router } from '@angular/router';
import { ispisNaDveCifre } from '../zajednicke-funkcionalnosti';

@Component({
  selector: 'app-zaposleni-pregled-termina',
  templateUrl: './zaposleni-pregled-termina.component.html',
  styleUrls: ['./zaposleni-pregled-termina.component.css']
})
export class ZaposleniPregledTerminaComponent implements OnInit {

  constructor(private zaposleniService: ZaposleniService, private router: Router) { }

  ngOnInit(): void {
    this.zaposleni = JSON.parse(localStorage.getItem('korisnik'));
    this.datum = new Date();
    this.zaposleniService.dohvatiRadnoVreme(this.zaposleni._id, this.datum).subscribe((odgovor: any) => {
      this.termini = odgovor;
    });
  }

  poruka : string = '';

  zaposleni;
  datum;

  termini = [];

  ispisiVreme(termin) {
    const pocetak = Number(termin.vreme_pocetka);
    const kraj = Number(termin.vreme_zavrsetka);

    const satPocetka = Math.floor(pocetak / 60);
    const minutPocetka = pocetak % 60;

    const satZavrsetka = Math.floor(kraj / 60);
    const minutZavrsetka = kraj % 60;

    return `${ispisNaDveCifre(satPocetka)}:${ispisNaDveCifre(minutPocetka)}-${ispisNaDveCifre(satZavrsetka)}:${ispisNaDveCifre(minutZavrsetka)}`;
  }

  datumPromenjen() {
    console.log('pozvan datumPromenjen()');
    if (this.datum == 'Invalid Date') return this.poruka = 'Unesite ispravan datum u formatu Mesec/Dan/Godina.';

    this.zaposleniService.dohvatiRadnoVreme(this.zaposleni._id, this.datum).subscribe((odgovor: any) => {
      this.termini = odgovor;
      console.log(odgovor);
    });
    return '';
  }

}
