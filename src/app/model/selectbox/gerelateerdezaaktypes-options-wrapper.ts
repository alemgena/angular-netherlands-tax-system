import {ZaaktypeOmschrijvingModel} from "../zaaktype/zaaktype-omschrijving.model";
import {SelectBoxOption, SelectBoxOptionsWrapper} from "./select-box-option.model";

export class GerelateerdezaaktypesOptionsWrapper  implements SelectBoxOptionsWrapper {

  selectBoxOptions: SelectBoxOption[];

  constructor(zaaktypeModels: ZaaktypeOmschrijvingModel[]) {
    this.selectBoxOptions = zaaktypeModels.map(zaaktypeModels => {
      return {
        title: zaaktypeModels.omschrijving,
        value: zaaktypeModels.code
      } as SelectBoxOption;
    });
  }
}
