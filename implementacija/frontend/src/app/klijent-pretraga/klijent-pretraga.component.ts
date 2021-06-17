import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../klijent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent-pretraga',
  templateUrl: './klijent-pretraga.component.html',
  styleUrls: ['./klijent-pretraga.component.css']
})
/**
 * Klasa za rad sa komponentom za pretragu od strane klijenta
 */
export class KlijentPretragaComponent implements OnInit {

  constructor(private klijentService : KlijentService, private router: Router) { }

  ngOnInit(): void {
  }

  pojam;
  klijentPretrazio = false;
  rezultatPretrage;

  /**
   * Pretraga po zadatom pojmu
   */
  trazi() {
    this.klijentService.pretraga(this.pojam).subscribe((odgovor : any) => {
      this.rezultatPretrage = odgovor;
      this.klijentPretrazio = true;
    });
  }

  /**
   * Skracivanje stringa na 100 karaktera
   */
  skrati(tekst){
    if (tekst.length > 100) return `${tekst.substring(0, 100)}...`;
    else return tekst;
  }

  /**
   * Skok na pregled firme
   */
  pregled(firma){
    localStorage.setItem('firma', JSON.stringify(firma));
    this.router.navigate(['/klijent/firma']);
  }
}
