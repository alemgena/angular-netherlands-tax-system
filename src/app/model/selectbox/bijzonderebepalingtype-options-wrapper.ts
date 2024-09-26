import {BijzondereBepalingtypeModel} from "../bijzondereBepalingtype.model";
import {SelectBoxOption, SelectBoxOptionsWrapper} from "./select-box-option.model";

export class BijzondereBepalingTypeSelectBoxOptionsWrapper implements SelectBoxOptionsWrapper{
  selectBoxOptions: SelectBoxOption[];

  constructor(bijzondereBepalingTypes: BijzondereBepalingtypeModel[]) {
    this.selectBoxOptions = bijzondereBepalingTypes.map(bijzondereBepalingType => {
      return {
        title: `${bijzondereBepalingType.type} met reden ${bijzondereBepalingType.reden}`,
        value: bijzondereBepalingType.uuid,
      } as SelectBoxOption;
    });
  }
}
