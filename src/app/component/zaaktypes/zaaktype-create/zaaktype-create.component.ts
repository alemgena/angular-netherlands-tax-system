import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskStepItemWrapper} from "../../../model/task-step-item-wrapper.model";
import {ZaaktypeConceptService} from "../../../service/zaaktype-concept.service";
import {ZaaktypeModel} from "../../../model/zaaktype/zaaktype.model";
import {ZaaktypeConceptStepService} from "../../../service/zaaktype-concept-step.service";
import {ConceptCreateBase} from "../../concept-utils/concept-create-base";
import {InputValidationService} from "../../../service/input-validation-service";


@Component({
  selector: 'app-zaaktype-create',
  templateUrl: './zaaktype-create.component.html',
  styleUrls: ['./zaaktype-create.component.css']
})
export class ZaaktypeCreateComponent extends ConceptCreateBase implements OnInit {
  zaaktype: ZaaktypeModel | null = null;
  isFormValid: boolean = true;
  steps: TaskStepItemWrapper[] = [
    {
      icon: "",
      label: "Zaaktypedetails",
      completed: false,
      active: true,
      route: "zaaktypedetails"
    },
    {
      icon: "",
      label: "Bijzondere Bepalingen",
      route: "bijzondere-bepalingen"
    },
    {
      icon: "",
      label: "Informatieobjecttypes",
      route: "informatieobjecttypes"
    },
    {
      icon: "",
      label: "Aanleiding(en)",
      route: "aanleidingtypes"
    },
    {
      icon: "",
      label: "Statustypes",
      route: "statustypes"
    },
    {
      icon: "",
      label: "Roltypes",
      route: "roltypes"
    },
    {
      icon: "",
      label: "Resultaattypes",
      route: "resultaattypes"
    },
    {
      icon: "",
      label: "Behandelactiviteit(en)",
      route: "behandelactiviteittypes"
    },
    {
      icon: "",
      label: "Beschikkingtypes",
      route: "beschikkingtypes"
    },
    {
      icon: "",
      label: "Gerelateerde zaaktypes",
      route: "gerelateerde-zaaktypes"
    },
    {
      icon: "verzend",
      label: "Overzicht",
      route: "overzicht"
    }
  ]

  constructor(
    protected router: Router,
    private inputValidationService: InputValidationService,
    protected route: ActivatedRoute,
    protected ngZone:NgZone,
    private zaaktypeConceptService: ZaaktypeConceptService,
    protected stepService: ZaaktypeConceptStepService) {
    super(router, ngZone, route, stepService)
    this.stepBaseUrl = 'zaaktype-concepten'
  }

  callPatchApiForStep() {
    this.zaaktypeConceptService.getObservableZaaktype().subscribe(concept => {
      this.zaaktypeConceptService.patchTypeConcept(<ZaaktypeModel>concept, concept.uuid)
        .then(() => {})
    })
  }

  ngOnInit() {
    this.inputValidationService.isFormValid$.subscribe(isValid => {
      this.isFormValid = isValid;
    });
    this.setStepAndCode()
    this.zaaktypeConceptService.clear()
    this.zaaktypeConceptService.setTypeCode(this.code)
    this.zaaktypeConceptService.getObservableZaaktype()
      .subscribe((zaaktype) => {
        this.loading = false
        this.zaaktype = zaaktype;
      })
  }

}
