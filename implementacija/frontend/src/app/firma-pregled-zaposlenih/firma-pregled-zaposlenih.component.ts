import { Component, OnInit } from '@angular/core';
import { FirmaService } from '../firma.service';
import { Korisnik } from '../modeli/korisnik.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firma-pregled-zaposlenih',
  templateUrl: './firma-pregled-zaposlenih.component.html',
  styleUrls: ['./firma-pregled-zaposlenih.component.css']
})
export class FirmaPregledZaposlenihComponent implements OnInit {

  constructor(private firmaService: FirmaService, private router: Router) { }

  ngOnInit() {
    this.firma = JSON.parse(localStorage.getItem('korisnik'));
    this.firmaService.dohvatiZaposlene(this.firma._id).subscribe((odgovor) => {
      this.zaposleni = odgovor;
    });
  }

  poruka: string = '';

  firma = null;
  zaposleni: Array<Korisnik> = [];

  otpusti(zaposleni) {
    this.firmaService.otpustiZaposlenog(zaposleni._id).subscribe((odgovor: any) => {
      if (odgovor.poruka) return this.poruka = odgovor.poruka;

      alert('Uspešno ste otpustili zaposlenog.');
      this.firmaService.dohvatiZaposlene(this.firma._id).subscribe((odgovor) => {
        this.zaposleni = odgovor;
      });
    });
  }

  promeniUsluge(z) {
    localStorage.setItem('zaposleni', JSON.stringify(z));
    this.router.navigate(['/firma/zaposleni/usluge']);
  }

  dodeliRadnoVreme(z){
    localStorage.setItem('zaposleni', JSON.stringify(z));
    this.router.navigate(['/firma/zaposleni/radno_vreme']);
  }
}
