import {ZaaktypeModel} from "./zaaktype.model";

export interface ZaaktypesModel {
  resultaten: ZaaktypeModel[];

  _links: {
    self: {
      href: string
    }
  };

}
