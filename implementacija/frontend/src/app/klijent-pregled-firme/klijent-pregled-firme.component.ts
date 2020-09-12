import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../klijent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent-pregled-firme',
  templateUrl: './klijent-pregled-firme.component.html',
  styleUrls: ['./klijent-pregled-firme.component.css']
})
export class KlijentPregledFirmeComponent implements OnInit {

  constructor(private klijentService: KlijentService, private router: Router) { }

  ngOnInit(): void {
    this.firma = JSON.parse(localStorage.getItem('firma'));
    this.klijentService.dohvatiUsluge(this.firma._id).subscribe((odgovor : any) => {
      this.usluge = odgovor;
    })
  }

  firma;
  usluge;

  zakazi(usluga){
    localStorage.setItem('usluga', JSON.stringify(usluga));
    this.router.navigate(['/klijent/zakazi']);
  }
}
