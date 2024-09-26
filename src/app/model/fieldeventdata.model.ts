import {FieldDataModel} from "./fielddata.model";

export interface FieldEventDataModel {
  newValue: string;
  propertyName: string;
  field?: FieldDataModel;
}
