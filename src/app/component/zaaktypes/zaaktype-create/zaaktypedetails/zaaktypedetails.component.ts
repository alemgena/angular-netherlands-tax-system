import {Component, NgZone, OnInit} from '@angular/core';
import {Initiatie, Vertrouwelijkheidaanduiding, ZaaktypeModel} from "../../../../model/zaaktype/zaaktype.model";
import {ZaaktypeConceptService} from "../../../../service/zaaktype-concept.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ZaaktypeConceptStepService} from "../../../../service/zaaktype-concept-step.service";
import {SelectBoxOption} from "../../../../model/selectbox/select-box-option.model";
import {ReferentielijstenService} from "../../../../service/referentielijsten.service";
import {
  ReferentielijstenSelectBoxOptionsService
} from "../../../../service/selectbox/referentie-lijsten-select-box-options.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputValidationService} from "../../../../service/input-validation-service";

@Component({
  selector: 'app-zaaktypedetails',
  templateUrl: './zaaktypedetails.component.html',
  styleUrls: ['./zaaktypedetails.component.css']
})
export class ZaaktypedetailsComponent implements OnInit {
  code: string | null = null;
  zaakTypeForm!: FormGroup
  zaaktype: ZaaktypeModel | null = null;
  termijnMogelijkheden: string[] = []
  initiatieZaakOptions: any = [
    {
      title: "Extern",
      value: Initiatie.EXTERN
    },
    {
      title: "Intern",
      value: Initiatie.INTERN
    }
  ];

  referentietypeOptions: SelectBoxOption[] | null = null;
  vertrouwelijkheidOptions: any = [
    {
      title: "Openbaar",
      value: Vertrouwelijkheidaanduiding.OPENBAAR
    },
    {
      title: "Intern",
      value: Vertrouwelijkheidaanduiding.INTERN
    },
    {
      title: "Zaakvertrouwelijk",
      value: Vertrouwelijkheidaanduiding.ZAAKVERTROUWELIJK
    },
    {
      title: "Vertrouwelijk",
      value: Vertrouwelijkheidaanduiding.VERTROUWELIJK
    },
    {
      title: "Geheim",
      value: Vertrouwelijkheidaanduiding.GEHEIM
    },
  ];

  constructor(private route: ActivatedRoute,
              private zaaktypeConceptService: ZaaktypeConceptService,
              private inputValidationService: InputValidationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private ngZone:NgZone,
              private stepService: ZaaktypeConceptStepService,
              private referentielijstenSelectBoxOptionsService: ReferentielijstenSelectBoxOptionsService,
              private referentielijstenService: ReferentielijstenService) {}

  onReferentiezaaktypeChanged() {
    this.referentielijstenService
      .getReferentieLijstItemForUuid('zaaktypes', this.zaaktype!.referentietypeItemUuid)
      .subscribe(selectedReferentieZaaktype => {
        this.zaaktype!.omschrijving = selectedReferentieZaaktype.omschrijving;
        this.updateZaaktype()
      });
  }

  updateZaaktype() {
    this.stepService.setType(this.zaaktype!)
  }

  onTermijnMogelijkhedenChange(event: any, input: string): void {
    if (this.zaaktype) {
      if (input == 'opschortingMogelijk') {
        if (event.detail)
          this.zaaktype.beslistermijn.mogelijkheden.opschortingMogelijk = true;
        else
          this.zaaktype.beslistermijn.mogelijkheden.opschortingMogelijk = false
      } else  if (input == 'verdagingMogelijk') {
        if (event.detail)
          this.zaaktype.beslistermijn.mogelijkheden.verdagingMogelijk = true;
        else
          this.zaaktype.beslistermijn.mogelijkheden.verdagingMogelijk = false
      } else if (input == 'verlengingMogelijk') {
        if (event.detail)
          this.zaaktype.beslistermijn.mogelijkheden.verlengingMogelijk = true;
        else
          this.zaaktype.beslistermijn.mogelijkheden.verlengingMogelijk = false
      }
    }
    this.updateZaaktype()
  }

  async save() {
    this.ngZone.runOutsideAngular(() => {
      // Create a Promise to wait for the asynchronous changes to be applied
      const waitForChangesPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 0);
      });

      // Wait for the promise to resolve before making the API call
      waitForChangesPromise.then(async () => {
        let zt = await this.zaaktypeConceptService.postTypeConcept(<ZaaktypeModel>this.zaaktype)
        this.stepService.setZaaktypeAfterCreate();
        if (zt) {
          await this.router.navigateByUrl('zaaktype-concepten/' + zt.code + '/bijzondere-bepalingen')
        }
      });
    });
  }


  ngOnInit(): void {
    this.stepService.setCodeAfterReloadFor(this.route);
    this.zaaktypeConceptService.setTypeCode(this.stepService.getCode());
    this.fetchZaakType()
    this.initForm();
    this.referentielijstenSelectBoxOptionsService.getObservableSelectBoxOptions("zaaktypes")
      .subscribe((selectBoxOptions: SelectBoxOption[]) => {
        this.referentietypeOptions = selectBoxOptions;
    });
    this.zaakTypeForm.statusChanges.subscribe(() => {
      this.inputValidationService.updateFormValidity(this.zaakTypeForm.valid);
    });
    this.updateTermijnMogelijkheden();
  }

  getCode(): string | null {
    return this.stepService.getCode();
  }

  fetchZaakType() {
    return this.zaaktypeConceptService.getObservableZaaktype()
      .subscribe(result => {
        this.zaaktype = result;
      });
  }

  private updateTermijnMogelijkheden() {
    let termijnMogelijkheden = this.zaaktype?.beslistermijn?.mogelijkheden;
    termijnMogelijkheden?.opschortingMogelijk && this.termijnMogelijkheden.push('opschortingMogelijk');
    termijnMogelijkheden?.verdagingMogelijk && this.termijnMogelijkheden.push('verdagingMogelijk');
    termijnMogelijkheden?.verlengingMogelijk && this.termijnMogelijkheden.push('verlengingMogelijk');
  }

  initForm(): void {
    this.zaakTypeForm= this.formBuilder.group({
      referentietypeItemUuid: [this.zaaktype?.referentietypeItemUuid, [Validators.required, Validators.minLength(1)]],
      omschrijving: [this.zaaktype?.omschrijving, [Validators.minLength(1), Validators.maxLength(255)]],
      initiatie: [this.zaaktype?.initiatie, Validators.required],
      vertrouwelijkheidAanduiding: [this.zaaktype?.vertrouwelijkheidAanduiding, Validators.required],
      doorlooptijd: [this.zaaktype?.beslistermijn.doorlooptijd, [ Validators.pattern("^[0-9]*$"),Validators.min(0), Validators.max(999)]],
    });
  }
}
