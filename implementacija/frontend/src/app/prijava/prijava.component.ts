import { Component, OnInit } from '@angular/core';
import { GostService } from '../gost.service';
import { Korisnik } from '../modeli/korisnik.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private gostService: GostService, private router: Router) { }

  ngOnInit() { }

  poruka: string = '';
  email: string = '';
  lozinka: string = '';

  prijaviSe() {
    if (this.email == '' || this.lozinka == '') {
      this.poruka = 'Unesite sva polja.';
      return;
    }

    this.gostService.prijava(this.email, this.lozinka).subscribe((odgovor: any) => {
      if (odgovor.poruka) {
        this.poruka = odgovor.poruka;
        return;
      }

      const tip = odgovor.tip;
      if (tip === 'klijent') this.router.navigate(['klijent/pocetna']);
      else if (tip === 'zaposleni') this.router.navigate(['zaposleni/pocetna']);
      else this.router.navigate(['firma/pocetna']);
    })
  }



}
