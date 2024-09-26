import {BasetypeModel} from "./basetype.model";

export interface InformatieobjecttypeModel extends BasetypeModel  {
  omschrijving: string;
  volgnummer: number;
  richting: Richting | "";

}

export enum Richting {
  INKOMEND,
  INTERN,
  UITGAAND
}
