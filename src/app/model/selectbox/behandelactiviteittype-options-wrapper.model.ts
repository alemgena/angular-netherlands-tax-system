import {SelectBoxOption, SelectBoxOptionsWrapper} from "./select-box-option.model";
import {BehandelactiviteittypeModel} from "../behandelactiviteittype.model";

export class BehandelactiviteittypeOptionsWrapperModel implements SelectBoxOptionsWrapper{
  selectBoxOptions: SelectBoxOption[];

  constructor(behandelactiviteittypeModels: BehandelactiviteittypeModel[]) {
    this.selectBoxOptions = behandelactiviteittypeModels.map(bat => {
      return {
        title: `${bat.code} - ${bat.omschrijving}`,
        value: bat.code
      } as SelectBoxOption;
    });
  }
}
