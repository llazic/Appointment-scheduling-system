

export function tipKorisnika(korisnik) {
    if (korisnik == null) return null;

    const tip = korisnik.tip;

    if (tip === 'klijent') return 'klijent';
    else if (tip === 'zaposleni') return 'zaposleni';
    else return 'firma';
}

export function odjava(router){
    localStorage.removeItem('korisnik');
    router.navigate(['']);
}