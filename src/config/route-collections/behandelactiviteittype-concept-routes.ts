import {Routes} from "@angular/router";
import {AuthGuard} from "../../app/authentication/auth.guard";
import {RoleGroupsModel} from "../../app/model/role-groups.model";
import {
  BehandelactiviteittypeTableConceptDataComponent
} from "../../app/component/behandelactiviteittype-concepten/create/table-concept-data/behandelactiviteittype-table-concept-data.component";
import {
  BehandelactiviteittypeDetailsComponent
} from "../../app/component/behandelactiviteittype-concepten/create/details/behandelactiviteittype-details.component";
import {
  BehandelactiviteittypeOverzichtStepComponent
} from "../../app/component/behandelactiviteittype-concepten/create/behandelactiviteittype-overzicht/behandelactiviteittype-overzicht-step.component";

export const BEHANDELACTIVITEITTYPE_CONCEPT_ROUTES: Routes = [
  {
    path: 'details',
    component: BehandelactiviteittypeDetailsComponent,
    title: 'CATALOGUS - Nieuw Behandelactiviteittype - Details',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'statustypes',
    component: BehandelactiviteittypeTableConceptDataComponent,
    title: 'CATALOGUS - Nieuw Behandelactiviteittype - Statustypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'roltypes',
    component: BehandelactiviteittypeTableConceptDataComponent,
    title: 'CATALOGUS - Nieuw Behandelactiviteittype - Roltypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'resultaattypes',
    component: BehandelactiviteittypeTableConceptDataComponent,
    title: 'CATALOGUS - Nieuw Behandelactiviteittype - Resultaattypes',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'eigenschappen',
    component: BehandelactiviteittypeTableConceptDataComponent,
    title: 'CATALOGUS - Nieuw Behandelactiviteittype - Eigenschappen',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'overzicht',
    
    component: BehandelactiviteittypeOverzichtStepComponent,
    title: 'CATALOGUS - Nieuw Behandelactiviteittype - Overzicht',
    canActivate:[AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  }
]
