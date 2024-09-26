import {RoltypeModel} from "./roltype.model";
import {StatustypeModel} from "./statustype.model";
import {ResultaatModel} from "./resultaat.model";
import {BasetypeModel} from "./basetype.model";
import {EigenschapModel} from "./eigenschap.model";
import {ConceptBaseModel} from "./concept-base.model";

export interface BehandelactiviteittypeModel extends BasetypeModel, ConceptBaseModel {
  uuid?: string;
  code?: string;
  referentielijstomschrijving: string;
  omschrijving: string;
  toelichting: string;
  roltypes: RoltypeModel[];
  statustypes: StatustypeModel[];
  resultaattypes: ResultaatModel[];
  eigenschappen: EigenschapModel[];
  versiedatum?: string;
}

/**
 * Simple instance check because typescript doesn't support interface instance checking.
 * Note that we ignore checking uuid and versiedatum because they can be undefined.
 *
 * @param object
 * @return boolean whether the given object fits in a behandelactiviteittype model.
 */
export function isBehandelactiviteittypeModel(object: any): boolean {
  return 'omschrijving' in object &&
    'toelichting' in object &&
    'roltypes' in object &&
    'statustypes' in object &&
    'roltypes' in object &&
    'eigenschappen' in object
}
