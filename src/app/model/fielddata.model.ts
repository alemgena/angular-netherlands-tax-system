import {SelectBoxOption} from "./selectbox/select-box-option.model";
import {Observable} from "rxjs";

export interface FieldDataModel {
  fieldType: string;
  inputType: string;
  required: boolean;
  type: string;
  name: string;
  selectBoxOptions?: Observable<SelectBoxOption[]>;
}
