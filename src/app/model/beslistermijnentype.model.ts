import {TermijnMogelijkheidModel} from "./termijnMogelijkheid.model";
import {BijzondereBepalingtypeModel} from "./bijzondereBepalingtype.model";

export interface BeslistermijnentypeModel {
  mogelijkheden: TermijnMogelijkheidModel;
  doorlooptijd: number;
  bijzondereBepalingen: BijzondereBepalingtypeModel[];
}
