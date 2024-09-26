import {Observable} from "rxjs";

interface TitleValuePair {
  title: string;
  value: any;
}

export type SelectBoxOption = TitleValuePair;

export interface SelectBoxOptionsService{
  getObservableSelectBoxOptions: (input?: any) => Observable<SelectBoxOption[]>;
}

export interface SelectBoxOptionsWrapper{
  selectBoxOptions: SelectBoxOption[];
}
