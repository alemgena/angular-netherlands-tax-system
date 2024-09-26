import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {SelectBoxOption, SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";
import {AardRelatie} from "../../model/gerelateerdezaaktype.model";

@Injectable({
  providedIn: 'root'
})
export class AardRelatieSelectBoxOptionsService implements SelectBoxOptionsService {
  private selectBoxOptions: SelectBoxOption[] = [
    {
      title: "Gerelateerd",
      value: AardRelatie.GERELATEERD
    },
    {
      title: "Vervolg",
      value: AardRelatie.VERVOLG
    },
    {
      title: "Samenstel",
      value: AardRelatie.SAMENSTEL
    }
  ];
  private observableSelectBoxOptions: Observable<SelectBoxOption[]> = of(this.selectBoxOptions);

  getObservableSelectBoxOptions(){
    return this.observableSelectBoxOptions;
  }
}
