import { Component, OnInit } from '@angular/core';
import * as zajednickeFunkcionalnosti from '../zajednicke-funkcionalnosti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent-nav',
  templateUrl: './klijent-nav.component.html',
  styleUrls: ['./klijent-nav.component.css']
})
export class KlijentNavComponent implements OnInit {

  constructor(private router: Router) { }

  klijent;

  ngOnInit() {
    let korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.klijent = korisnik;
    switch (zajednickeFunkcionalnosti.tipKorisnika(korisnik)) {
      case 'klijent':
        return;
      case 'zaposleni':
        this.router.navigate(['/zaposleni/pocetna']);
        return;
      case 'firma':
        this.router.navigate(['/firma/pocetna']);
        return;
      default:
        this.router.navigate(['/']);
        return;
    }
  }

  odjava() {
    zajednickeFunkcionalnosti.odjava(this.router);
  }
}
