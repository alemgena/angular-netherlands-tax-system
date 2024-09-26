import {ReferentielijstItemModel} from "../zaaktype/zaaktype-referentie.model";
import {SelectBoxOption, SelectBoxOptionsWrapper} from "./select-box-option.model";

export class ReferentielijstOptionsWrapper implements SelectBoxOptionsWrapper {
  selectBoxOptions: SelectBoxOption[];

  constructor(referentielijstItems: ReferentielijstItemModel[]) {
    this.selectBoxOptions = referentielijstItems.map(referentielijstItem => {
      return {
        title: referentielijstItem.omschrijving,
        value: referentielijstItem.uuid
      } as SelectBoxOption;
    });
  }
}
