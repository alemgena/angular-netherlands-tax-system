import {Routes} from '@angular/router';
import {ZaaktypesComponent} from "./component/zaaktypes/zaaktypes.component";
import {HomeComponent} from "./component/home/home.component";
import {ZaaktypeCreateComponent} from "./component/zaaktypes/zaaktype-create/zaaktype-create.component";
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./authentication/auth.guard";
import {ZaaktypeConceptenComponent} from "./component/zaaktype-concepten/zaaktypeConcepten.component";
import {RoleGroupsModel} from "./model/role-groups.model";
import {ZaaktypeInfoWrapperComponent} from "./component/zaaktypes/zaaktype-info/zaaktype-info-wrapper.component";
import {ZaaktypeVaststellen} from "./component/zaaktype-concepten/vaststellen/zaaktype-vaststellen";
import {BijzondereBepalingenComponent} from "./component/bijzondere-bepalingen/bijzondere-bepalingen.component";
import {
  BijzondereBepalingenDetailsComponent
} from "./component/bijzondere-bepalingen/bijzondere-bepalingen-details/bijzondere-bepalingen-details.component";
import {BehandelactiviteittypesComponent} from "./component/behandelactiviteittypes/behandelactiviteittypes.component";
import {EigenschappenComponent} from "./component/eigenschappen/eigenschappen.component";
import {
  BehandelactiviteittypeConceptenComponent
} from "./component/behandelactiviteittype-concepten/behandelactiviteittype-concepten.component";
import {ZAAKTYPE_CONCEPT_ROUTES} from "../config/route-collections/zaaktype-concept-routes";
import {BEHANDELACTIVITEITTYPE_CONCEPT_ROUTES} from "../config/route-collections/behandelactiviteittype-concept-routes";
import {
  BehandelactiviteittypeConceptCreateComponent
} from "./component/behandelactiviteittype-concepten/create/behandelactiviteittype-concept-create.component";
import {
  BehandelactiviteittypeInfoWrapperComponent
} from "./component/behandelactiviteittypes/behandelactiviteittype-info/behandelactiviteittype-info-wrapper.component";
import {
  BehandelactiviteittypeVaststellen
} from "./component/behandelactiviteittype-concepten/vaststellen/behandelactiviteittype-vaststellen";
import {
  EigenschappenDetailsComponent
} from "./component/eigenschappen/eigenschappen-details/eigenschappen-details.component";
import {ReferentielijstenComponent} from "./component/referentielijsten/referentielijsten.component";
import {ProductenComponent} from "./component/producten/producten.component";
import {PRODUCTEN_ROUTES} from "../config/route-collections/producten-routes";
import {ProductenCreateComponent} from "./component/producten/create/producten-create.component";

export const ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'CATALOGUS - Home'
  },
  {
    path: 'zaaktypes',
    component: ZaaktypesComponent,
    title: 'CATALOGUS - Zaaktypes'
  },
  {
    path: 'bijzondere-bepalingen',
    component: BijzondereBepalingenComponent,
    title: 'CATALOGUS - Bijzondere Bepalingen',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'bijzondere-bepalingen/:uuid',
    component: BijzondereBepalingenDetailsComponent,
    title: 'CATALOGUS - Bijzondere Bepalingen Details',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER] }
  },
  {
    path: 'zaaktype-concepten',
    component: ZaaktypeConceptenComponent,
    title: 'CATALOGUS - Zaaktype Concepten',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER, RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'zaaktype-concepten/:code',
    component: ZaaktypeCreateComponent,
    title: 'CATALOGUS - Nieuw zaaktype',
    children: ZAAKTYPE_CONCEPT_ROUTES,
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER, RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'zaaktype-vaststellen/:code',
    component: ZaaktypeVaststellen,
    title: 'CATALOGUS - Vastellen nieuw zaaktype',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'behandelactiviteittype-vaststellen/:code',
    component: BehandelactiviteittypeVaststellen,
    title: 'CATALOGUS - Vastellen nieuw zaaktype',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'zaaktypes/:code',
    component: ZaaktypeInfoWrapperComponent,
    title: 'CATALOGUS - Zaaktype details'
  },
  {
    path: 'behandelactiviteittypes',
    component: BehandelactiviteittypesComponent,
    title: 'CATALOGUS - Behandelactiviteittypes'
  },
  {
    path: 'referentielijsten',
    component: ReferentielijstenComponent,
    title: 'CATALOGUS - Referentielijsten'
  },
  {
    path: 'behandelactiviteittypes/:code',
    component: BehandelactiviteittypeInfoWrapperComponent,
    title: 'CATALOGUS - Behandelactiviteittype details'
  },
  {
    path: 'behandelactiviteittype-concepten',
    component: BehandelactiviteittypeConceptenComponent,
    title: 'CATALOGUS - Behandelactiviteittype Concepten',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER, RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'behandelactiviteittype-concepten/:code',
    component: BehandelactiviteittypeConceptCreateComponent,
    title: 'CATALOGUS - Nieuw behandelactiviteittype',
    children: BEHANDELACTIVITEITTYPE_CONCEPT_ROUTES,
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER, RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'eigenschappen',
    component: EigenschappenComponent,
    title: 'CATALOGUS - Eigenschappen',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER]}
  },

  {
    path: 'producten',
    component: ProductenComponent,
    title: 'CATALOGUS - Producten',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER, RoleGroupsModel.VASTSTELLER] }
  },

  {
    path: 'producten/:uuid',
    component: ProductenCreateComponent,
    title: 'CATALOGUS - Producten',
    children:PRODUCTEN_ROUTES,
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER, RoleGroupsModel.VASTSTELLER] }
  },
  {
    path: 'eigenschappen/:uuid',
    component: EigenschappenDetailsComponent,
    title: 'CATALOGUS - Eigenschappen Details',
    canActivate: [AuthGuard],
    data: { roles: [RoleGroupsModel.INRICHTER]}
  },
  {path: '**', redirectTo: 'home'},
];
