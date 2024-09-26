export interface ResultatenModel<T> {
  resultaten: T[];
}

export interface ReferentielijstModel {
  uuid: string;
  url: string;
  naam: string;
  beheerder: {
    naam: string;
    afdeling: string;
  } | null;
  toelichting: string;
  begindatumGeldigheid: string | null;
  einddatumGeldigheid: string | null;
}

export interface ReferentielijstItemModel {
  url: string;
  uuid: string;
  omschrijving: string;
  definitie: string;
  herkomst: {
    code: string;
    naam: string;
  };
  begindatumGeldigheid: string | null;
  einddatumGeldigheid: string | null;
}

export interface ReferentielijstErrorModel {
  bericht: string;
  details: string;
  velden: {
    additionalProp1: string,
    additionalProp2: string,
    additionalProp3: string

  }
}
