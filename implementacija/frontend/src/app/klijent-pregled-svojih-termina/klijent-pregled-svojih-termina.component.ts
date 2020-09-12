import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KlijentService } from '../klijent.service';
import { ispisNaDveCifre } from '../zajednicke-funkcionalnosti';

@Component({
  selector: 'app-klijent-pregled-svojih-termina',
  templateUrl: './klijent-pregled-svojih-termina.component.html',
  styleUrls: ['./klijent-pregled-svojih-termina.component.css']
})
export class KlijentPregledSvojihTerminaComponent implements OnInit {

  constructor(private klijentService: KlijentService, private router: Router) { }

  ngOnInit(): void {
    this.klijent = JSON.parse(localStorage.getItem('korisnik'));
    this.klijentService.dohvatiTermineZaKlijenta(this.klijent._id).subscribe((odgovor: any) => {
      this.termini = odgovor;
    });
  }

  klijent;
  termini;

  ispisiDatum(datum) {
    datum = new Date(datum);
    return `${datum.getDate()}.${datum.getMonth() + 1}.${datum.getFullYear()}`;
  }

  ispisiVremePocetka(vremeUMinutima) {
    const sati = Math.floor(Number(vremeUMinutima) / 60);
    const minuti = Number(vremeUMinutima) % 60;
    return `${ispisNaDveCifre(sati)}:${ispisNaDveCifre(minuti)}`;
  }

  pregledTermina(termin) {
    localStorage.setItem('termin', JSON.stringify(termin));
    this.router.navigate(['/klijent/termin']);
  }
}
