

export function tipKorisnika(korisnik) {
  if (korisnik == null) return null;

  const tip = korisnik.tip;

  if (tip === 'klijent') return 'klijent';
  else if (tip === 'zaposleni') return 'zaposleni';
  else return 'firma';
}

export function odjava(router) {
  localStorage.removeItem('korisnik');
  router.navigate(['']);
}

export function ispisNaDveCifre(broj): string {
  return broj < 10 ? '0' + broj : '' + broj;
}

export function ispisDatuma(datum) {
  datum = new Date(datum);
  let dan;
  switch (datum.getDay()) {
    case 1: dan = 'Ponedeljak'; break;
    case 2: dan = 'Utorak'; break;
    case 3: dan = 'Sreda'; break;
    case 4: dan = 'Četvrtak'; break;
    case 5: dan = 'Petak'; break;
    case 6: dan = 'Subota'; break;
    case 7: dan = 'Nedelja'; break;
  }
  return `${dan}, ${datum.getDate()}.${datum.getMonth() + 1}.${datum.getFullYear()}.`;
}