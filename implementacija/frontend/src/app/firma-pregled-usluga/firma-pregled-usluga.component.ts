import { Component, OnInit } from '@angular/core';
import { FirmaService } from '../firma.service';

@Component({
  selector: 'app-firma-pregled-usluga',
  templateUrl: './firma-pregled-usluga.component.html',
  styleUrls: ['./firma-pregled-usluga.component.css']
})
/**
 * Klasa za rad sa komponentom za pregled usluga od strane firme
 */
export class FirmaPregledUslugaComponent implements OnInit {

  constructor(private firmaService: FirmaService) { }

  ngOnInit() {
    this.firma = JSON.parse(localStorage.getItem('korisnik'));
    this.firmaService.dohvatiUsluge(this.firma._id).subscribe((odgovor : any) => {
      this.usluge = odgovor;
    });
  }

  firma;
  usluge = [];

}
