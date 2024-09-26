import {Injectable} from '@angular/core';
import {map, mergeMap, Observable} from "rxjs";
import {BijzondereBepalingTypeSelectBoxOptionsWrapper} from "../../model/selectbox/bijzonderebepalingtype-options-wrapper";
import {SelectBoxOption, SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";
import {BijzondereBepalingService} from "../bijzondere-bepaling.service";
import {ZaaktypeConceptService} from "../zaaktype-concept.service";

@Injectable({
  providedIn: 'root'
})
export class BijzondereBepalingTypeSelectBoxOptionsService implements SelectBoxOptionsService {

  constructor(private bijzondereBepalingService: BijzondereBepalingService,
              private zaaktypeConceptService: ZaaktypeConceptService) {
  }

  getObservableSelectBoxOptions() {
    return new Observable<SelectBoxOption[]>((observer) => {
      this.zaaktypeConceptService
        .getObservableZaaktype()
        .pipe(
          mergeMap(zaaktype => this.bijzondereBepalingService.getBijzondereBepalingenFiltered(zaaktype.code)),
          map(bijzondereBepalingTypes => observer.next(new BijzondereBepalingTypeSelectBoxOptionsWrapper(bijzondereBepalingTypes).selectBoxOptions))
        ).subscribe();
    });
  };
}
