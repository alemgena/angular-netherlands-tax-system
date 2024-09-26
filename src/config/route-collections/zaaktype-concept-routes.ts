import {Routes} from "@angular/router";
import {
  ZaaktypedetailsComponent
} from "../../app/component/zaaktypes/zaaktype-create/zaaktypedetails/zaaktypedetails.component";
import {AuthGuard} from "../../app/authentication/auth.guard";
import {RoleGroupsModel} from "../../app/model/role-groups.model";
import {
  ZaaktypeTableConceptData
} from "../../app/component/zaaktypes/zaaktype-create/table-concept-data/zaaktype-table-concept-data";
import {
  ZaaktypeOverzichtStepComponent
} from "../../app/component/zaaktypes/zaaktype-create/zaaktype-overzicht/zaaktype-overzicht-step.component";

export const ZAAKTYPE_CONCEPT_ROUTES: Routes = [
  {
    path: 'zaaktypedetails',
    component: ZaaktypedetailsComponent,
    title: 'CATALOGUS - Nieuw Zaaktype - details',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'aanleidingtypes',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - aanleidingtypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'behandelactiviteittypes',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - behandelactiviteittypes',
    canActivate:[AuthGuard],
    data: { role: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'statustypes',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - statustypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'roltypes',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - roltypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'informatieobjecttypes',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - informatieobjecttypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'resultaattypes',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - resultaattypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'beschikkingtypes',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - beschikkingtypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'bijzondere-bepalingen',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - bijzondere bepalingen',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'gerelateerde-zaaktypes',
    component: ZaaktypeTableConceptData,
    title: 'CATALOGUS - Nieuw Zaaktype - gerelateerde zaaktypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'overzicht',
    component: ZaaktypeOverzichtStepComponent,
    title: 'CATALOGUS - Nieuw Zaaktype - overzicht',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  }
]
