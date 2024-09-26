export interface BijzondereBepalingtypeModel {
  uuid?: string;
  type: TermijnType | "";
  reden: string;
  aantal: AantalTermijnen | "";
  eersteTermijn: number;
  opvolgendeTermijn: number;
}

export enum TermijnType {
  VERLENGING = "Verlenging",
  OPSCHORTING = "Opschorting",
  VERDAGING = "Verdaging",
  INVALID = "INVALID"
}

export enum AantalTermijnen {
  EEN = "1",
  TWEE = "2",
  MEER_DAN_TWEE = ">2",
  INVALID = "INVALID"
}
