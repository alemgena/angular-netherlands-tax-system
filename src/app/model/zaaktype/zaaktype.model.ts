import {AanleidingtypeModel} from "../aanleidingtype.model";
import {BehandelactiviteittypeModel} from "../behandelactiviteittype.model";
import {BeslistermijnentypeModel} from "../beslistermijnentype.model";
import {StatustypeModel} from "../statustype.model";
import {RoltypeModel} from "../roltype.model";
import {InformatieobjecttypeModel} from "../informatieobjecttype.model";
import {ResultaatModel} from "../resultaat.model";
import {BeschikkingtypeModel} from "../beschikkingtype.model";
import {GerelateerdezaaktypeModel} from "../gerelateerdezaaktype.model";
import {BasetypeModel} from "../basetype.model";
import {ConceptBaseModel} from "../concept-base.model";


export interface ZaaktypeModel extends BasetypeModel, ConceptBaseModel {
  uuid: string,
  code: string;
  omschrijving: string;
  referentielijstomschrijving: string;
  referentietypeItemUuid: string;
  initiatie: Initiatie;
  vertrouwelijkheidAanduiding: Vertrouwelijkheidaanduiding;
  versiedatum: Date;
  begindatumGeldigheid: Date;
  einddatumGeldigheid: Date;
  aanleidingtypes: AanleidingtypeModel[];
  behandelactiviteittypes: BehandelactiviteittypeModel[];
  beslistermijn: BeslistermijnentypeModel;
  statustypes: StatustypeModel[];
  roltypes: RoltypeModel[];
  informatieobjecttypes: InformatieobjecttypeModel[];
  resultaattypes: ResultaatModel[];
  beschikkingtypes: BeschikkingtypeModel[];
  gerelateerdeZaaktypes: GerelateerdezaaktypeModel[];

  [key: string]: any;
}

export enum Initiatie {
  INTERN = "INTERN",
  EXTERN = "EXTERN"
}

export enum Vertrouwelijkheidaanduiding {
  GEHEIM = "GEHEIM",
  VERTROUWELIJK = "VERTROUWELIJK",
  ZAAKVERTROUWELIJK = "ZAAKVERTROUWELIJK",
  INTERN = "INTERN",
  OPENBAAR = "OPENBAAR"
}
