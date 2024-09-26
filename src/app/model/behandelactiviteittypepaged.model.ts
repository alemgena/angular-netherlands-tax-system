import {Links, Page} from "./pagination.model";
import {BehandelactiviteittypeModel} from "./behandelactiviteittype.model";

export interface BehandelactiviteittypepagedModel {
  page: Page
  _embedded: {'behandelactiviteittypeDTOList': BehandelactiviteittypeModel[]}
  _links: Links
}
