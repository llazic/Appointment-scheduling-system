import { Component, OnInit } from '@angular/core';
import * as zajednickeFunkcionalnosti from '../zajednicke-funkcionalnosti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firma-nav',
  templateUrl: './firma-nav.component.html',
  styleUrls: ['./firma-nav.component.css']
})
export class FirmaNavComponent implements OnInit {

  constructor(private router: Router) { }

  firma;

  ngOnInit() {
    let korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.firma = korisnik;
    switch (zajednickeFunkcionalnosti.tipKorisnika(korisnik)) {
      case 'klijent':
        this.router.navigate(['/klijent/pocetna']);
        return;
      case 'zaposleni':
        this.router.navigate(['/zaposleni/pocetna']);
        return;
      case 'firma':
        return;
      default:
        this.router.navigate(['']);
        return;
    }
  }

  odjava() {
    zajednickeFunkcionalnosti.odjava(this.router);
  }
}
