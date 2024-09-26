import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {SelectBoxOption, SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";
import {BetrokkeneType} from "../../model/roltype.model";

@Injectable({
  providedIn: 'root'
})
export class BetrokkeneTypeSelectBoxOptionsService implements SelectBoxOptionsService {
  private selectBoxOptions: SelectBoxOption[] = [
    {
      title: "Becon",
      value: BetrokkeneType.BECON
    },
    {
      title: "Natuurlijk persoon",
      value: BetrokkeneType.NATUURLIJK_PERSOON
    },
    {
      title: "Niet natuurlijk persoon",
      value: BetrokkeneType.NIET_NATUURLIJK_PERSOON
    },
    {
      title: "Entiteit",
      value: BetrokkeneType.ENTITEIT
    },
    {
      title: "Medewerker",
      value: BetrokkeneType.MEDEWERKER
    },
    {
      title: "Kandidaat ANBI",
      value: BetrokkeneType.KANDIDAAT_ANBI
    },
    {
      title: "FD zonder beconnr",
      value: BetrokkeneType.FD_ZONDER_BECONNR
    },
    {
      title: "Persoon zonder finr",
      value: BetrokkeneType.PERSOON_ZONDER_FINR
    },
    {
      title: "Werkgroep",
      value: BetrokkeneType.WERKGROEP
    }
  ];
  private observableSelectBoxOptions: Observable<SelectBoxOption[]> = of(this.selectBoxOptions);

  getObservableSelectBoxOptions(){
    return this.observableSelectBoxOptions;
  }
}
