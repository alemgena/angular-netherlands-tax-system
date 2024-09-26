export interface EigenschapModel {
  uuid?: string;
  naam: string;
  definitie: string;
  formaat: Formaat| "";
  lengte: number;
  waardenverzameling: EigenschapsWaarde[];
  kardinaliteit: number;
  toelichting: string;
}

export interface EigenschapsWaarde {
  uuid?: string;
  waarde: string;
}

export enum Formaat {
  TEKST ,
  GETAL ,
  DATUM ,
  DATUM_TIJD,
}
