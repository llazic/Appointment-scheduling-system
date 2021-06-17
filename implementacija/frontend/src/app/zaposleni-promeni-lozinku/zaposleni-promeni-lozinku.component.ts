import { Component, OnInit } from '@angular/core';
import { ZaposleniService } from '../zaposleni.service';
import { Router } from '@angular/router';
import * as zajednickeFunkcionalnosti from '../zajednicke-funkcionalnosti';
import * as validacija from '../validacija';

@Component({
  selector: 'app-zaposleni-promeni-lozinku',
  templateUrl: './zaposleni-promeni-lozinku.component.html',
  styleUrls: ['./zaposleni-promeni-lozinku.component.css']
})
/** 
 * Klasa za rad sa komponentom za promenu lozinke zaposlenog
*/
export class ZaposleniPromeniLozinkuComponent implements OnInit {

  constructor(private zaposleniService : ZaposleniService, private router : Router) { }

  ngOnInit() {
    this.zaposleni = JSON.parse(localStorage.getItem('korisnik'));
  }

  poruka : string = '';
  
  zaposleni;

  stara_lozinka = '';
  nova_lozinka = '';

  /**
   * Promena lozinke
   */
  promeniLozinku() {
    if (validacija.popunjenoSve([this.stara_lozinka, this.nova_lozinka]) === false) return this.poruka = 'Unesite sva polja.';

    if (this.nova_lozinka.length < 8) return this.poruka = 'Lozinka mora imati bar 8 karaktera.';

    this.zaposleniService.promeniLozinku(this.zaposleni._id, this.stara_lozinka, this.nova_lozinka).subscribe((odgovor : any) => {
      if (odgovor.poruka) return this.poruka = odgovor.poruka;

      alert('Uspešno ste promenili lozinku! Sad se možete prijaviti pomoću nje.');
      zajednickeFunkcionalnosti.odjava(this.router);
    });
  }
}
