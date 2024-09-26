import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {SelectBoxOption, SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";

@Injectable({
  providedIn: 'root'
})
export class BooleanSelectBoxOptionsService implements SelectBoxOptionsService {
  private selectBoxOptions: SelectBoxOption[] = [
    {
      title: "Ja",
      value: true
    },
    {
      title: "Nee",
      value: false
    }
  ];
  private observableSelectBoxOptions: Observable<SelectBoxOption[]> = of(this.selectBoxOptions);

  getObservableSelectBoxOptions(){
    return this.observableSelectBoxOptions;
  }
}
