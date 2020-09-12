import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {
  uri = 'http://localhost:3232';

  constructor(private http: HttpClient, private router: Router) { }

  pretraga(pojam) {
    return this.http.get(`${this.uri}/pretraga/${pojam}`);
  }

  dohvatiUsluge(firma_id): any {
    return this.http.get(`${this.uri}/usluge/${firma_id}`);
  }

  dohvatiZaposlene(firma_id, usluga_id){
    return this.http.get(`${this.uri}/zaposleni/${firma_id}/${usluga_id}`);
  }

  dohvatiTermine(firma_id, datum){
    return this.http.get(`${this.uri}/termini/${firma_id}/${datum}`);
  }

  dohvatiFirmu(firma_id){
    return this.http.get(`${this.uri}/firma/${firma_id}`);
  }

  zakaziTermin(klijent_id, zaposleni_id, usluga_id, datum, vreme_pocetka) {
    const data = {
      klijent_id : klijent_id,
      zaposleni_id : zaposleni_id,
      usluga_id : usluga_id,
      datum : datum,
      vreme_pocetka : vreme_pocetka
    }
    return this.http.post(`${this.uri}/termin/zakazi`, data);
  }

  dohvatiTermineZaKlijenta(klijent_id) {
    return this.http.get(`${this.uri}/termini/${klijent_id}`);
  }

  dohvatiZaposlenog(zaposleni_id){
    return this.http.get(`${this.uri}/zaposleni/${zaposleni_id}`);
  }

  otkaziTermin(zaposleni_id, datum, vreme_pocetka, vreme_zavrsetka){
    const data = {
      zaposleni_id : zaposleni_id,
      datum : datum,
      vreme_pocetka : vreme_pocetka,
      vreme_zavrsetka : vreme_zavrsetka
    }
    return this.http.post(`${this.uri}/termin/otkazi`, data);
  }
}
