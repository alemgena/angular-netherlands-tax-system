export interface GerelateerdezaaktypeModel {
  zaaktype: string;
  aardRelatie: AardRelatie | "";
  toelichting: string;
}

export enum AardRelatie {
  VERVOLG,
  SAMENSTEL,
  GERELATEERD
}
