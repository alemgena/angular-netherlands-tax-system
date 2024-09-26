import {map, tap} from "rxjs";
import {SelectBoxOption, SelectBoxOptionsService} from "../../model/selectbox/select-box-option.model";
import {ReferentielijstenService} from "../referentielijsten.service";
import {ReferentielijstOptionsWrapper} from "../../model/selectbox/referentielijst-options-wrapper";
import {ReferentielijstItemModel, ResultatenModel} from "../../model/zaaktype/zaaktype-referentie.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export abstract class ReferentielijstenSelectBoxOptionsService implements SelectBoxOptionsService {
  protected constructor(private referentielijstenService: ReferentielijstenService) {
  }

  getObservableSelectBoxOptions(referentieLijstName: string) {
    return this.referentielijstenService
      .getReferentielijstItemsForName(referentieLijstName)
      .pipe(map((ztr: ResultatenModel<ReferentielijstItemModel>) => {
        return new ReferentielijstOptionsWrapper(ztr.resultaten).selectBoxOptions
      }));
  }
}
