export interface Korisnik {
    _id : string,
    tip : string,
    ime : string,
    prezime : string,
    email : string,
    hash_lozinke : string
    firma_id: string,
    usluge: Array<string>
}