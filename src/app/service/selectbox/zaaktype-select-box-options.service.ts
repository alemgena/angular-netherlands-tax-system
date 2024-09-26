import {Injectable} from '@angular/core';
import {SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";
import {GerelateerdezaaktypesOptionsWrapper} from "../../model/selectbox/gerelateerdezaaktypes-options-wrapper";
import {map} from "rxjs";
import {CatalogusService} from "../catalogus.service";

@Injectable({
  providedIn: 'root'
})
export class ZaaktypeSelectBoxOptionsService implements SelectBoxOptionsService {
  protected constructor(private catalogusService: CatalogusService) {
  }

  getObservableSelectBoxOptions(){
    return this.catalogusService.getZaaktypesPagedsize(0, 1000)
      .pipe(map(zaaktypePagedModel => new GerelateerdezaaktypesOptionsWrapper(zaaktypePagedModel._embedded.zaaktypeomschrijvingen).selectBoxOptions));
  }
}
