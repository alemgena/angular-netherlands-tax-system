import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskStepItemWrapper} from "../../../model/task-step-item-wrapper.model";
import {BehandelactiviteittypeModel} from "../../../model/behandelactiviteittype.model";
import {BehandelactiviteittypeConceptService} from "../../../service/behandelactiviteittype-concept.service";
import {ConceptCreateBase} from "../../concept-utils/concept-create-base";
import {BehandelactiviteittypeConceptStepService} from "../../../service/behandelactiviteittype-concept-step.service";

@Component({
  selector: 'app-behandelactiviteittype-create',
  templateUrl: './behandelactiviteittype-concept-create.component.html',
  styleUrls: ['./behandelactiviteittype-concept-create.component.css']
})
export class BehandelactiviteittypeConceptCreateComponent extends ConceptCreateBase implements OnInit {
  behandelactiviteit: BehandelactiviteittypeModel | null = null;
  steps: TaskStepItemWrapper[] = [
    {
      icon: "",
      label: "Behandelactiviteittype details",
      completed: false,
      active: true,
      route: "details"
    },
    {
      icon: "",
      label: "Roltypes",
      route: "roltypes"
    },
    {
      icon: "",
      label: "Statustypes",
      route: "statustypes"
    },
    {
      icon: "",
      label: "Resultaattypes",
      route: "resultaattypes"
    },
    {
      icon: "",
      label: "Eigenschappen",
      route: "eigenschappen"
    },
    {
      icon: "verzend",
      label: "Overzicht",
      route: "overzicht"
    }
  ]

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected ngZone:NgZone,
    private behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService,
    protected stepService: BehandelactiviteittypeConceptStepService) {
    super(router, ngZone, route, stepService);
    this.stepBaseUrl = 'behandelactiviteittype-concepten'
  }

  callPatchApiForStep() {
    this.behandelactiviteittypeConceptService.getObservableBehandelactiviteit().subscribe(concept => {
      this.behandelactiviteittypeConceptService
        .patchTypeConcept(<BehandelactiviteittypeModel>concept, concept?.uuid)
        .then(() => {
        })
    })
  }

  ngOnInit() {
    this.setStepAndCode()
    this.behandelactiviteittypeConceptService.clear()
    this.behandelactiviteittypeConceptService.setTypeCode(this.code)
    this.behandelactiviteittypeConceptService.getObservableBehandelactiviteit()
      .subscribe((behandelactiviteittype) => {
        this.loading = false
        this.behandelactiviteit = behandelactiviteittype;
      })
  }
}
