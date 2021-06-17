import { Component, OnInit } from '@angular/core';
import * as zajednickeFunkcionalnosti from '../zajednicke-funkcionalnosti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zaposleni-nav',
  templateUrl: './zaposleni-nav.component.html',
  styleUrls: ['./zaposleni-nav.component.css']
})
/**
 * Klasa za rad sa komponentom za navigaciju zaposlenog
 */
export class ZaposleniNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    let korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.zaposleni = korisnik;
    switch (zajednickeFunkcionalnosti.tipKorisnika(korisnik)) {
      case 'klijent':
        this.router.navigate(['/klijent/pocetna']);
        return;
      case 'zaposleni':
        return;
      case 'firma':
        this.router.navigate(['/firma/pocetna']);
        return;
      default:
        this.router.navigate(['/']);
        return;
    }
  }

  zaposleni;

  /**
   * Odjavljivanje sa sistema
   */
  odjava() {
    zajednickeFunkcionalnosti.odjava(this.router);
  }
}
