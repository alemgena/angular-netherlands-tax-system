import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BldcComponentsAngularModule} from '@belastingdienst/bldc-components-angular';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app.routes";
import {ConfigService} from "./service/config.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./component/home/home.component";
import {ZaaktypesComponent} from "./component/zaaktypes/zaaktypes.component";
import {NotificationComponent} from './component/notification/notification.component';
import {ErrorInterceptor} from "./interceptor/error.interceptor";
import {NotificationService} from "./service/notification.service";
import {CatalogusService} from "./service/catalogus.service";
import {ZaaktypeInfoComponent} from './component/zaaktypes/zaaktype-info/zaaktype-info.component';
import {ZaaktypeCreateComponent} from './component/zaaktypes/zaaktype-create/zaaktype-create.component';
import {
  ZaaktypedetailsComponent
} from './component/zaaktypes/zaaktype-create/zaaktypedetails/zaaktypedetails.component';
import {TableDetailComponent} from './component/zaaktypes/zaaktype-info/table-detail/table-detail.component';
import {
  ZaaktypeTableConceptData
} from './component/zaaktypes/zaaktype-create/table-concept-data/zaaktype-table-concept-data';
import {
  TableConceptAddModalComponent
} from './component/concept-utils/table-concept-add-modal/table-concept-add-modal.component';
import {
  TextFieldInputComponent
} from './component/zaaktypes/zaaktype-create/customFields/text-field-input/text-field-input.component';
import {JwtLoginComponent} from './component/jwt-login/jwt-login.component';
import {LoginComponent} from './component/login/login.component';
import {AuthInterceptor} from "./authentication/auth.interceptor";
import {ZaaktypeConceptenComponent} from "./component/zaaktype-concepten/zaaktypeConcepten.component";
import {ZaaktypeInfoWrapperComponent} from "./component/zaaktypes/zaaktype-info/zaaktype-info-wrapper.component";
import {
  ZaaktypeOverzichtStepComponent
} from "./component/zaaktypes/zaaktype-create/zaaktype-overzicht/zaaktype-overzicht-step.component";
import {ZaaktypeVaststellen} from "./component/zaaktype-concepten/vaststellen/zaaktype-vaststellen";
import {BijzondereBepalingenComponent} from "./component/bijzondere-bepalingen/bijzondere-bepalingen.component";
import {
  BijzondereBepalingenDetailsComponent
} from "./component/bijzondere-bepalingen/bijzondere-bepalingen-details/bijzondere-bepalingen-details.component";
import {CheckboxComponent} from './component/zaaktypes/zaaktype-create/customFields/checkbox/checkbox.component';
import {SelectBoxComponent} from './component/zaaktypes/zaaktype-create/customFields/select-box/select-box.component';
import {BehandelactiviteittypesComponent} from "./component/behandelactiviteittypes/behandelactiviteittypes.component";
import {EigenschappenComponent} from "./component/eigenschappen/eigenschappen.component";
import {
  EigenschappenDetailsComponent
} from "./component/eigenschappen/eigenschappen-details/eigenschappen-details.component";
import {
  BehandelactiviteittypeConceptenComponent
} from "./component/behandelactiviteittype-concepten/behandelactiviteittype-concepten.component";
import {
  BehandelactiviteittypeConceptCreateComponent
} from "./component/behandelactiviteittype-concepten/create/behandelactiviteittype-concept-create.component";
import {
  BehandelactiviteittypeTableConceptDataComponent
} from "./component/behandelactiviteittype-concepten/create/table-concept-data/behandelactiviteittype-table-concept-data.component";
import {
  BehandelactiviteittypeDetailsComponent
} from "./component/behandelactiviteittype-concepten/create/details/behandelactiviteittype-details.component";
import {
  BehandelactiviteittypeVaststellen
} from "./component/behandelactiviteittype-concepten/vaststellen/behandelactiviteittype-vaststellen";
import {
  BehandelactiviteittypeInfoWrapperComponent
} from "./component/behandelactiviteittypes/behandelactiviteittype-info/behandelactiviteittype-info-wrapper.component";
import {
  BehandelactiviteittypeInfoComponent
} from "./component/behandelactiviteittypes/behandelactiviteittype-info/behandelactiviteittype-info.component";
import {
  BehandelactiviteittypeOverzichtStepComponent
} from "./component/behandelactiviteittype-concepten/create/behandelactiviteittype-overzicht/behandelactiviteittype-overzicht-step.component";
import {InputValidationService} from "./service/input-validation-service";
import {ReferentielijstenComponent} from "./component/referentielijsten/referentielijsten.component";
import {ProductenComponent} from "./component/producten/producten.component";
import {ProductenCreateComponent} from "./component/producten/create/producten-create.component";
import {ProductionDetailsComponent} from "./component/producten/create/producten-details/production-details.component";

import {VariantenComponent} from "./component/producten/create/varianten/varianten.component";
import {VariantAddModalComponent} from "./component/producten/create/variant-add-modal/variant-add-modal.component";
import {
  ProductenOverzichtStepComponent
} from "./component/producten/create/producten-overzicht/producten-overzicht-step.component";
import {ProductenInfoComponent} from "./component/producten/producten-info/producten-info/producten-info.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ZaaktypesComponent,
    NotificationComponent,
    ZaaktypeInfoComponent,
    ZaaktypeInfoWrapperComponent,
    ZaaktypeCreateComponent,
    ZaaktypeConceptenComponent,
    ZaaktypedetailsComponent,
    TableDetailComponent,
    ZaaktypeTableConceptData,
    BehandelactiviteittypeTableConceptDataComponent,
    TableConceptAddModalComponent,
    TextFieldInputComponent,
    JwtLoginComponent,
    LoginComponent,
    ZaaktypeVaststellen,
    BehandelactiviteittypeVaststellen,
    ZaaktypeOverzichtStepComponent,
    BijzondereBepalingenComponent,
    BijzondereBepalingenDetailsComponent,
    EigenschappenComponent,
    EigenschappenDetailsComponent,
    BehandelactiviteittypesComponent,
    BehandelactiviteittypeConceptenComponent,
    BehandelactiviteittypeConceptCreateComponent,
    BehandelactiviteittypeDetailsComponent,
    CheckboxComponent,
    SelectBoxComponent,
    BehandelactiviteittypeInfoWrapperComponent,
    BehandelactiviteittypeInfoComponent,
    BehandelactiviteittypeOverzichtStepComponent,
    ReferentielijstenComponent,
    ProductenComponent,
    ProductenCreateComponent,
    ProductionDetailsComponent,
    VariantenComponent,
    VariantAddModalComponent,
    ProductenOverzichtStepComponent,
    ProductenInfoComponent

  ],
  imports: [
    BrowserModule,
    DragDropModule,
    BldcComponentsAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {useHash: true, anchorScrolling: 'enabled'}),
  ],
  providers: [
    // Add services here
    // services for Karma tests here ??
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfigService: ConfigService) => {
        return () => {
          return appConfigService.loadConfiguration();
        };
      },
      deps: [ConfigService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    NotificationService,
    CatalogusService,
    InputValidationService
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
