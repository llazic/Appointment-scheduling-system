import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
/**
 * Klasa koja objedinjuje metode za rad sa firmom
 */
export class FirmaService {
  uri = 'http://localhost:3232';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Dodavanje nove usluge firme
   */
  dodajUslugu(naziv, trajanje, cena, firma_id) {
    const data = {
      naziv: naziv,
      trajanje: trajanje,
      cena: cena,
      firma_id: firma_id
    }
    return this.http.post(`${this.uri}/usluga`, data);
  }

  /**
   * Dohvatanje usluga firme
   */
  dohvatiUsluge(firma_id): any {
    return this.http.get(`${this.uri}/usluge/${firma_id}`);
  }

  /**
   * Dodavanje zaposlenog u firmu
   */
  dodajZaposlenog(ime, prezime, email, firma_id, usluge) {
    const data = {
      ime: ime,
      prezime: prezime,
      email: email,
      firma_id: firma_id,
      usluge: usluge
    }
    return this.http.post(`${this.uri}/zaposleni`, data);
  }

  /**
   * Dohvatanje zaposlenih u firmi
   */
  dohvatiZaposlene(firma_id): any {
    return this.http.get(`${this.uri}/${firma_id}/zaposleni`);
  }

  /**
   * Otpustanje zaposlenog iz firme
   */
  otpustiZaposlenog(zaposleni_id) {
    return this.http.delete(`${this.uri}/zaposleni/${zaposleni_id}`);
  }

  /**
   * Azuriranje usluga zaposlenog
   */
  azurirajZaposlenog(zaposleni_id, usluge) {
    const data = {
      usluge : usluge
    }
    return this.http.put(`${this.uri}/zaposleni/${zaposleni_id}`, data);
  }

  /**
   * Dodavanje radnog vremena zaposlenog
   */
  dodajRadnoVreme(zaposleni_id, datumOd, datumDo, vremeOd, vremeDo, odabraniRadniDani) {
    const data = {
      zaposleni_id : zaposleni_id,
      datumOd : datumOd,
      datumDo : datumDo,
      vremeOd : vremeOd,
      vremeDo : vremeDo,
      odabraniRadniDani : odabraniRadniDani
    }
    return this.http.post(`${this.uri}/termini/kreiraj`, data);
  }

  /**
   * Dohvatanje radnog vremena zaposlenog za zadati datum
   */
  dohvatiRadnoVreme(zaposleni_id, datum){
    const data = {
      zaposleni_id : zaposleni_id,
      datum : datum,
    }
    return this.http.get(`${this.uri}/termini/zaposleni/${zaposleni_id}/${datum}`);
  }
}
