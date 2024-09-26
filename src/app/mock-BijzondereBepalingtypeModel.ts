import {AantalTermijnen, BijzondereBepalingtypeModel, TermijnType} from "./model/bijzondereBepalingtype.model";

export let BIJZONDEREBEPALINGTYPEMODEL: BijzondereBepalingtypeModel[] = [
  {
    uuid: "1",
    type: TermijnType.VERLENGING,
    reden: "rede 1",
    opvolgendeTermijn: 2,
    eersteTermijn: 1,
    aantal: AantalTermijnen.EEN
  },
  {
    uuid: "2",
    type: TermijnType.OPSCHORTING,
    reden: "rede 2",
    opvolgendeTermijn: 2,
    eersteTermijn: 1,
    aantal: AantalTermijnen.EEN
  }
];
