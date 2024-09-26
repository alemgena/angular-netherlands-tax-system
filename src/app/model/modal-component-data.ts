import {FieldDataModel} from "./fielddata.model";
import {ColumnDataModel} from "./columndata.model";

export interface ModalComponentData {
  title: string;
  deleteEndpointTitle: string
  fields: FieldDataModel[];
}
export interface ModalColumnData {
  title: string;
  fields: ColumnDataModel[];
}
