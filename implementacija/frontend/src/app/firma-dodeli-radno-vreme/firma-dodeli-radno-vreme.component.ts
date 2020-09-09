import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firma-dodeli-radno-vreme',
  templateUrl: './firma-dodeli-radno-vreme.component.html',
  styleUrls: ['./firma-dodeli-radno-vreme.component.css']
})
export class FirmaDodeliRadnoVremeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.firma = JSON.parse(localStorage.getItem('korisnik'));
    this.zaposleni = JSON.parse(localStorage.getItem('zaposleni'));
    this.popuniNizove();
  }

  poruka : string = '';
  firma;
  zaposleni;

  godine = [];
  meseci = [];
  dani = [];
  sati = [];
  minuti = [];

  godinaOd : any = 'Godina'; mesecOd : any = 'Mesec'; danOd : any = 'Dan';
  godinaDo : any = 'Godina'; mesecDo : any = 'Mesec'; danDo : any = 'Dan';

  satOd : any = 'Sat'; minutOd : any = 'Minut';
  satDo : any = 'Sat'; minutDo : any = 'Minut';

  popuniNizove() {
    let sada = new Date();

    let godina = sada.getFullYear();
    this.godine.push(godina);
    this.godine.push(godina + 1);

    this.meseci = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
    for (let i = 1; i <= 31; i++) this.dani.push(i);
    for (let i = 0; i <= 24; i++) this.sati.push(i);
    this.minuti = [0, 10, 20, 30, 40, 50];
  }

  dodeli(){
    if (this.vrednostiUnete([this.godinaOd, this.godinaDo, this.mesecOd, this.mesecDo, this.danOd, this.danDo]) == false)
      return this.poruka = 'Unesite sva polja.';

    alert(this.godinaOd + ' ' + this.mesecOd + ' ' + this.danOd);
    let datum = new Date(this.godinaOd, this.mesecOd, this.danOd);
    alert(datum);
  }

  vrednostiUnete(vrednosti) : boolean {
    for (let v of vrednosti) {
      if (v === 'Godina' || v === 'Mesec' || v === 'Dan' || v === 'Sat' || v === 'Minut') return false;
    }
    return true;
  }
}
