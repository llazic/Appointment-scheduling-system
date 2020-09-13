import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirmaService } from '../firma.service';
import { ispisNaDveCifre } from '../zajednicke-funkcionalnosti';

@Component({
  selector: 'app-firma-pregled-radnog-vremena',
  templateUrl: './firma-pregled-radnog-vremena.component.html',
  styleUrls: ['./firma-pregled-radnog-vremena.component.css']
})
export class FirmaPregledRadnogVremenaComponent implements OnInit {

  constructor(private router: Router, private firmaService: FirmaService) { }

  ngOnInit(): void {
    this.zaposleni = JSON.parse(localStorage.getItem('zaposleni'));
    this.datum = new Date();
    this.firmaService.dohvatiRadnoVreme(this.zaposleni._id, this.datum).subscribe((odgovor: any) => {
      this.termini = odgovor;
    });
  }

  zaposleni;
  termini = [];

  datum;

  dodeliRadnoVreme() {
    this.router.navigate(['/firma/zaposleni/dodeli_radno_vreme']);
  }

  ispisiVreme(termin) {
    const pocetak = Number(termin.vreme_pocetka);
    const kraj = Number(termin.vreme_zavrsetka);

    const satPocetka = Math.floor(pocetak / 60);
    const minutPocetka = pocetak % 60;

    const satZavrsetka = Math.floor(kraj / 60);
    const minutZavrsetka = kraj % 60;

    return `${ispisNaDveCifre(satPocetka)}:${ispisNaDveCifre(minutPocetka)}-${ispisNaDveCifre(satZavrsetka)}:${ispisNaDveCifre(minutZavrsetka)}`;
  }
}
