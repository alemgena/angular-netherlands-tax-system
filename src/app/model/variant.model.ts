export interface VariantModel {
  uuid?: string;
  url?: string;
  code: string;
  naam: string;
  omschrijving: string;
  grondslag?: string;
  wettelijkeTermijn: number;
  serviceTermijn: number
  einddatumGeldigheid?: string;
  begindatumGeldigheid?: string;
  wijzigingsdatum?: string;
}
