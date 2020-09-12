import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KlijentService } from '../klijent.service';
import { ispisDatuma, ispisNaDveCifre } from '../zajednicke-funkcionalnosti';

@Component({
  selector: 'app-klijent-pregled-jednog-termina',
  templateUrl: './klijent-pregled-jednog-termina.component.html',
  styleUrls: ['./klijent-pregled-jednog-termina.component.css']
})
export class KlijentPregledJednogTerminaComponent implements OnInit {

  constructor(private klijentService: KlijentService, private router: Router) { }

  ngOnInit(): void {
    this.termin = JSON.parse(localStorage.getItem('termin'));
    this.klijent = JSON.parse(localStorage.getItem('korisnik'));
    this.klijentService.dohvatiZaposlenog(this.termin.zaposleni_id).subscribe((odgovor: any) => {
      this.zaposleni = odgovor;
    });
    this.klijentService.dohvatiFirmu(this.termin.usluga.firma_id).subscribe((odgovor: any) => {
      this.firma = odgovor;
    });
  }

  poruka: string = '';

  klijent;
  termin;
  firma;
  zaposleni;

  datumUBuducnosti(): boolean {
    let datum = new Date(this.termin.datum);
    const sat = Math.floor(Number(this.termin.vreme_pocetka) / 60);
    const minut = Number(this.termin.vreme_pocetka) % 60;
    datum.setHours(sat, minut, 0, 0);
    const sada = new Date();
    if (datum > sada) return true;
    else return false;
  }

  ispisiDatum(datum) {
    return ispisDatuma(datum);
  }

  ispisTermina(vreme_pocetka) {
    const pocetak = Number(vreme_pocetka);
    const kraj = Number(pocetak + this.termin.usluga.trajanje);

    const satPocetka = Math.floor(pocetak / 60);
    const minutPocetka = pocetak % 60;

    const satZavrsetka = Math.floor(kraj / 60);
    const minutZavrsetka = kraj % 60;

    return `${ispisNaDveCifre(satPocetka)}:${ispisNaDveCifre(minutPocetka)}-${ispisNaDveCifre(satZavrsetka)}:${ispisNaDveCifre(minutZavrsetka)}`;
  }

  otkaziTermin() {
    this.klijentService.otkaziTermin(this.termin.zaposleni_id, this.termin.datum, this.termin.vreme_pocetka, this.termin.vreme_zavrsetka).subscribe((odgovor : any) => {
      if (odgovor.poruka) return this.poruka = odgovor.poruka;

      alert('Uspešno ste otkazali termin!');
      this.router.navigate(['/klijent/termini']);
    });
  }
}
