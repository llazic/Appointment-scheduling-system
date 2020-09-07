import { Component, OnInit } from '@angular/core';
import * as zajednickeFunkcionalnosti from '../zajednicke-funkcionalnosti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gost-nav',
  templateUrl: './gost-nav.component.html',
  styleUrls: ['./gost-nav.component.css']
})
export class GostNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    let korisnik = JSON.parse(localStorage.getItem('korisnik'));
    // switch (zajednickeFunkcionalnosti.tipKorisnika(korisnik)) {
    //   case 'klijent':
    //     this.router.navigate(['/klijent/pocetna']);
    //     return;
    //   case 'zaposleni':
    //     this.router.navigate(['/zaposleni/pocetna']);
    //     return;
    //   case 'firma':
    //     this.router.navigate(['/firma/pocetna']);
    //     return;
    //   default:
    //     return;
    // }
  }

}
