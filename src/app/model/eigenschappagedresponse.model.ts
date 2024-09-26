import {Links, Page} from "./pagination.model";
import {EigenschapModel} from "./eigenschap.model";

export interface EigenschapPagedresponseModel {
  page: Page
  _embedded: {'eigenschapDTOList': EigenschapModel[]}
  _links: Links
}
