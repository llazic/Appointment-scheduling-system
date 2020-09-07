import { Component, OnInit } from '@angular/core';
import * as validacija from '../validacija';
import { FirmaService } from '../firma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firma-dodaj-uslugu',
  templateUrl: './firma-dodaj-uslugu.component.html',
  styleUrls: ['./firma-dodaj-uslugu.component.css']
})
export class FirmaDodajUsluguComponent implements OnInit {

  constructor(private firmaService: FirmaService, private router: Router) { }

  ngOnInit() {
    this.firma = JSON.parse(localStorage.getItem('korisnik'));
  }

  firma = null;
  poruka: string = '';
  naziv: string = '';
  trajanje: number;
  cena: number;

  dodajUslugu() {
    if (validacija.popunjenoSve([this.naziv, this.trajanje, this.cena]) == false) {
      this.poruka = 'Unesite sva polja.';
      return;
    }

    this.poruka = '';
    if (validacija.jePozitivanCeoBroj(this.trajanje) == false) this.poruka += ' Unesite ispravnu dužinu trajanja termina.';
    if (validacija.jePozitivanCeoBroj(this.cena) == false) this.poruka += ' Unesite ispravnu cenu po terminu.';

    if (this.poruka !== '') return;

    this.firmaService.dodajUslugu(this.naziv, this.trajanje, this.cena, this.firma._id).subscribe((odgovor : any) => {
      if (odgovor.poruka) return this.poruka = odgovor.poruka;
      
      alert('Uspešno ste dodali uslugu!');
      this.router.navigate(['/firma/usluge']);
    });
  }

}
