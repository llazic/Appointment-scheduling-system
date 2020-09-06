import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GostService {

  constructor(private http: HttpClient, private router : Router) {}

  uri = 'http://localhost:3232';

  prijava(email, lozinka) {
    const data = {
      email : email,
      lozinka : lozinka
    }
    return this.http.post(`${this.uri}/prijava`, data);
  }

  registracijaKlijenta(ime, prezime, email, lozinka) {
    const data = {
      ime : ime,
      prezime : prezime,
      email : email,
      lozinka : lozinka
    };
    return this.http.post(`${this.uri}/klijent`, data);
  }

  registracijaFirme(naziv, opis, email, lozinka, adresa) {
    const data = {
      naziv : naziv,
      opis : opis,
      email : email,
      lozinka : lozinka,
      adresa : adresa
    };
    return this.http.post(`${this.uri}/firma`, data);
  }
}
