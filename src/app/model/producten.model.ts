import {VariantModel} from "./variant.model";

export interface ProductenModel {
  uuid?: string;
  url?: string;
  code: string;
  naam: string;
  varianten: VariantModel[];
  omschrijving: string;
  beoogdResultaat?: string;
  einddatumGeldigheid?: string;
  begindatumGeldigheid?: string;
  wijzigingsdatum?: string;
  toelichting?: string;
}
