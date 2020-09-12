import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../klijent.service';
import { Router } from '@angular/router';
import * as validacija from '../validacija';
import { ispisNaDveCifre, ispisDatuma } from '../zajednicke-funkcionalnosti';

declare var podesiProgressBar: Function;

@Component({
  selector: 'app-klijent-zakazivanje',
  templateUrl: './klijent-zakazivanje.component.html',
  styleUrls: ['./klijent-zakazivanje.component.css']
})
export class KlijentZakazivanjeComponent implements OnInit {

  constructor(private klijentService: KlijentService, private router: Router) { }

  ngOnInit(): void {
    this.usluga = JSON.parse(localStorage.getItem('usluga'));
    this.klijent = JSON.parse(localStorage.getItem('korisnik'));
    this.klijentService.dohvatiZaposlene(this.usluga.firma_id, this.usluga._id).subscribe((odgovor) => {
      this.sviZaposleni = odgovor;
    });
  }

  poruka: string = '';

  firma;
  klijent;
  usluga;
  sviZaposleni;

  odabraniDatum;

  dostupnaVremena;
  odabranZaposleni = 'Odaberite';
  odabranoVreme = 'Odaberite';

  slobodniTerminiOdabranogZaposlenog() {
    if (this.odabranZaposleni === 'Odaberite') return [];
    let terminiOdabranogZaposlenog = this.radniDani.find(r => r.zaposleni_id === this.odabranZaposleni).termini;
    let slobodniTermini = [];
    for (let t of terminiOdabranogZaposlenog) {
      if (t.zauzeto === false) {
        for (let v = t.vreme_pocetka; v + this.usluga.trajanje <= t.vreme_zavrsetka; v += this.usluga.trajanje) {
          slobodniTermini.push(v);
        }
      }
    }
    return slobodniTermini;
  }

  ispisiDatum(datum){
    return ispisDatuma(datum);
  }

  ispisTermina(termin) {
    const pocetak = Number(termin);
    const kraj = Number(pocetak + this.usluga.trajanje);

    const satPocetka = Math.floor(pocetak / 60);
    const minutPocetka = pocetak % 60;

    const satZavrsetka = Math.floor(kraj / 60);
    const minutZavrsetka = kraj % 60;

    return `${ispisNaDveCifre(satPocetka)}:${ispisNaDveCifre(minutPocetka)}-${ispisNaDveCifre(satZavrsetka)}:${ispisNaDveCifre(minutZavrsetka)}`;
  }
  
  ispisZaposlenog(zaposleni_id){
    const zaposleni = this.sviZaposleni.find(z => z._id === zaposleni_id);
    return zaposleni.ime + ' ' + zaposleni.prezime;
  }

  korak = 1;

  radniDani;
  termini;

  sledeciKorak() {
    this.poruka = '';
    let ret;
    switch (this.korak) {
      case 1:
        if (validacija.popunjenoSve([this.odabraniDatum, this.odabranZaposleni]) === false) return this.poruka = 'Unesite sva polja.';
        if (this.datumOk() !== true) return;
        this.klijentService.dohvatiTermine(this.usluga.firma_id, this.odabraniDatum).subscribe((odgovor: any) => {
          this.radniDani = odgovor;
          this.podesiKorak2();
          this.korak++;
          podesiProgressBar(this.korak - 1);
        });
        break;
      case 2:
        if (this.odabranZaposleni === 'Odaberite' || this.odabranoVreme === 'Odaberite') return this.poruka = 'Unesite sva polja.';
        this.klijentService.dohvatiFirmu(this.usluga.firma_id).subscribe((odgovor : any) => {
          this.firma = odgovor;
          console.log(odgovor);
        });
        this.korak++;
        podesiProgressBar(this.korak - 1);
        break;
    }
  }

  prethodniKorak() {
    this.korak--;
    podesiProgressBar(this.korak - 1);
  }

  potvrdi() {
    this.klijentService.zakaziTermin(this.klijent._id, this.odabranZaposleni, this.usluga._id, this.odabraniDatum, this.odabranoVreme).subscribe((odgovor : any) => {
      if (odgovor.poruka) {
        alert(odgovor.poruka + ' Probajte da zakažete neki drugi termin.');
        this.router.navigate(['/klijent/zakazi']);
        return;
      }
      alert('Uspešno ste zakazali termin!');
      this.router.navigate(['/klijent/termini']);
    });
    podesiProgressBar(this.korak);
  }

  podesiKorak2() {
    for (let i = 0; i < this.radniDani.length; i++) {
      let zaposleni = this.sviZaposleni.find(z => z._id === this.radniDani[i].zaposleni_id);
      this.radniDani[i].ime = zaposleni.ime;
      this.radniDani[i].prezime = zaposleni.prezime;
    }
  }

  datumOk() {
    if (this.odabraniDatum == 'Invalid Date') return this.poruka = 'Unesite ispravan datum u formatu Mesec/Dan/Godina.';
    let sada = new Date();
    if (this.odabraniDatum <= sada) return this.poruka = 'Odaberite datum u budućnosti.';
    return true;
  }
}
