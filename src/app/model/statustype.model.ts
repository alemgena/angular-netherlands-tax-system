import {BasetypeModel} from "./basetype.model";

export interface StatustypeModel extends BasetypeModel {
  volgnummer: number;
  omschrijving: string;
  informeren: boolean;
  statustekst: string;
}
