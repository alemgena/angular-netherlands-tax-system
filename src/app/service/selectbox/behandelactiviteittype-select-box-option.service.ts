import {SelectBoxOption, SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";
import {map, Observable} from "rxjs";
import {CatalogusService} from "../catalogus.service";
import {
  BehandelactiviteittypeOptionsWrapperModel
} from "../../model/selectbox/behandelactiviteittype-options-wrapper.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BehandelactiviteittypeSelectBoxOptionService implements SelectBoxOptionsService {

  constructor(private catalogusService: CatalogusService) {
  }

  getObservableSelectBoxOptions() {
    return new Observable<SelectBoxOption[]>((observer) => {
      this.catalogusService
        .getBehandelactiviteittypes()
        .pipe(
          map(bat => observer.next(new BehandelactiviteittypeOptionsWrapperModel(bat).selectBoxOptions))
        ).subscribe();
    });
  };
}
