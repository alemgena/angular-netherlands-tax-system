import {Injectable} from '@angular/core';
import {SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";
import {map} from "rxjs";
import {EigenschappenService} from "../eigenschappen.service";
import {EigenschapOptionsWrapper} from "../../model/selectbox/eigenschap-options-wrapper";

@Injectable({
  providedIn: 'root'
})
export class EigenschapSelectBoxOptionsService implements SelectBoxOptionsService {
  protected constructor(private eigenschappenService: EigenschappenService) {
  }

  getObservableSelectBoxOptions(){
    return this.eigenschappenService.getAllEigenschappen()
      .pipe(map(eigenschapenModel => new EigenschapOptionsWrapper(eigenschapenModel).selectBoxOptions));
  }
}
