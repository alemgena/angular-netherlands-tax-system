import {BasetypeModel} from "./basetype.model";

export interface RoltypeModel extends BasetypeModel  {
  omschrijving: string;
  betrokkene: BetrokkeneType | "";

}

export enum BetrokkeneType {
  NATUURLIJK_PERSOON,
  NIET_NATUURLIJK_PERSOON,
  BECON,
  MEDEWERKER,
  ENTITEIT,
  FD_ZONDER_BECONNR,
  KANDIDAAT_ANBI,
  PERSOON_ZONDER_FINR,
  WERKGROEP
}
