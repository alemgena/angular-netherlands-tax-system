import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {SelectBoxOption, SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";
import {Richting} from "../../model/informatieobjecttype.model";

@Injectable({
  providedIn: 'root'
})
export class RichtingSelectBoxOptionsService implements SelectBoxOptionsService {
  private selectBoxOptions: SelectBoxOption[] = [
    {
      title: "Inkomend",
      value: Richting.INKOMEND
    },
    {
      title: "Intern",
      value: Richting.INTERN
    },
    {
      title: "Uitgaand",
      value: Richting.UITGAAND
    }
  ];
  private observableSelectBoxOptions: Observable<SelectBoxOption[]> = of(this.selectBoxOptions);

  getObservableSelectBoxOptions(){
    return this.observableSelectBoxOptions;
  }
}
