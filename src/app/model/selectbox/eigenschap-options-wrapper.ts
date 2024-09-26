import {SelectBoxOption, SelectBoxOptionsWrapper} from "./select-box-option.model";
import {EigenschapModel} from "../eigenschap.model";

export class EigenschapOptionsWrapper  implements SelectBoxOptionsWrapper {

  selectBoxOptions: SelectBoxOption[];

  constructor(eigenschap: EigenschapModel[]) {
    this.selectBoxOptions = eigenschap.map(eigenschapModel => {
      return {
        title: eigenschapModel.naam,
        value: eigenschapModel.uuid
      } as SelectBoxOption;
    });
  }
}
