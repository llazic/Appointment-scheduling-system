import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirmaService } from '../firma.service';
import { ispisNaDveCifre } from '../zajednicke-funkcionalnosti';

@Component({
  selector: 'app-firma-pregled-radnog-vremena',
  templateUrl: './firma-pregled-radnog-vremena.component.html',
  styleUrls: ['./firma-pregled-radnog-vremena.component.css']
})
/**
 * Klasa za rad sa komponentom za pregled radnog vremena od strane firme
 */
export class FirmaPregledRadnogVremenaComponent implements OnInit {

  constructor(private router: Router, private firmaService: FirmaService) { }

  ngOnInit(): void {
    this.zaposleni = JSON.parse(localStorage.getItem('zaposleni'));
    this.datum = new Date();
    this.firmaService.dohvatiRadnoVreme(this.zaposleni._id, this.datum).subscribe((odgovor: any) => {
      this.termini = odgovor;
    });
  }

  poruka : string = '';

  zaposleni;
  termini = [];

  datum;

  /**
   * Skok na dodelu radnog vremena zaposlenom
   */
  dodeliRadnoVreme() {
    this.router.navigate(['/firma/zaposleni/dodeli_radno_vreme']);
  }

  /**
   * Ispis vremena termina
   */
  ispisiVreme(termin) {
    const pocetak = Number(termin.vreme_pocetka);
    const kraj = Number(termin.vreme_zavrsetka);

    const satPocetka = Math.floor(pocetak / 60);
    const minutPocetka = pocetak % 60;

    const satZavrsetka = Math.floor(kraj / 60);
    const minutZavrsetka = kraj % 60;

    return `${ispisNaDveCifre(satPocetka)}:${ispisNaDveCifre(minutPocetka)}-${ispisNaDveCifre(satZavrsetka)}:${ispisNaDveCifre(minutZavrsetka)}`;
  }

  /**
   * Namestanje ispisa datuma nakon promene izbora datuma
   */
  datumPromenjen() {
    console.log('pozvan datumPromenjen()');
    if (this.datum == 'Invalid Date') return this.poruka = 'Unesite ispravan datum u formatu Mesec/Dan/Godina.';

    this.firmaService.dohvatiRadnoVreme(this.zaposleni._id, this.datum).subscribe((odgovor: any) => {
      this.termini = odgovor;
      console.log(odgovor);
    });
    return '';
  }
}
