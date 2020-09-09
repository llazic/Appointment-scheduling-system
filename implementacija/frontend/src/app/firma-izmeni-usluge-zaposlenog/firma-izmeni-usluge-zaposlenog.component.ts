import { Component, OnInit } from '@angular/core';
import { FirmaService } from '../firma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firma-izmeni-usluge-zaposlenog',
  templateUrl: './firma-izmeni-usluge-zaposlenog.component.html',
  styleUrls: ['./firma-izmeni-usluge-zaposlenog.component.css']
})
export class FirmaIzmeniUslugeZaposlenogComponent implements OnInit {

  constructor(private firmaService: FirmaService, private router: Router) { }

  ngOnInit() {
    this.firma = JSON.parse(localStorage.getItem('korisnik'));
    this.zaposleni = JSON.parse(localStorage.getItem('zaposleni'));
    this.odabraneUsluge = this.zaposleni.usluge == null ? [] : this.zaposleni.usluge;
    this.firmaService.dohvatiUsluge(this.firma._id).subscribe((odgovor : any) => {
      this.sveUsluge = odgovor;
    })
  }

  poruka : string = '';

  firma;
  zaposleni;

  sveUsluge : [];
  odabraneUsluge : any;

  kliknutCheckbox(usluga_id : string, uslugaOdabrana : boolean) {
    if (uslugaOdabrana) this.odabraneUsluge.push(usluga_id);
    else {
      const index = this.odabraneUsluge.indexOf(usluga_id);
      if (index > -1) this.odabraneUsluge.splice(index, 1);
    }
  }

  uslugaOdabrana(usluga_id) : boolean {
    return this.odabraneUsluge !== null && this.odabraneUsluge.includes(usluga_id);
  }

  sacuvaj(){
    this.firmaService.azurirajZaposlenog(this.zaposleni._id, this.odabraneUsluge).subscribe((odgovor : any) => {
      if (odgovor.poruka) return this.poruka = odgovor.poruka;

      alert('Uspešno ste izmenili usluge koje pruža zaposleni ' + this.zaposleni.ime + ' ' + this.zaposleni.prezime + '.');
      localStorage.removeItem('zaposleni');
      this.router.navigate(['/firma/zaposleni']);
    });
  }
}
