import {Component, EventEmitter, NgZone, OnInit, Output} from "@angular/core";
import {SelectBoxOption} from "../../../../model/selectbox/select-box-option.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ReferentielijstenService} from "../../../../service/referentielijsten.service";
import {BehandelactiviteittypeModel} from "../../../../model/behandelactiviteittype.model";
import {
  ReferentielijstenSelectBoxOptionsService
} from "../../../../service/selectbox/referentie-lijsten-select-box-options.service";
import {BehandelactiviteittypeConceptService} from "../../../../service/behandelactiviteittype-concept.service";
import {
  BehandelactiviteittypeConceptStepService
} from "../../../../service/behandelactiviteittype-concept-step.service";

@Component({
  selector: 'app-zaaktypedetails',
  templateUrl: './behandelactiviteittype-details.component.html',
  styleUrls: ['./behandelactiviteittype-details.component.css']
})
export class BehandelactiviteittypeDetailsComponent implements OnInit {
  code: string | null = null;
  disabled: boolean = true;
  @Output() zaaktypeEvent = new EventEmitter<BehandelactiviteittypeModel>()
  behandelactiviteittype: BehandelactiviteittypeModel | null = null;
  referentietypeOptions: SelectBoxOption[] | null = null;

  constructor(private route: ActivatedRoute,
              private behandelactiviteittypeConceptService: BehandelactiviteittypeConceptService,
              private router: Router,
              private ngZone:NgZone,
              private stepService: BehandelactiviteittypeConceptStepService,
              private referentielijstenSelectBoxOptionsService: ReferentielijstenSelectBoxOptionsService,
              private referentielijstenService: ReferentielijstenService) {}

  onReferentieBehandelactiviteittypeChanged() {
    this.referentielijstenService
      .getReferentieLijstItemForUuid('behandelactiviteittypes', this.behandelactiviteittype!.referentietypeItemUuid)
      .subscribe(sbat => {
        this.behandelactiviteittype!.omschrijving = sbat.omschrijving;
        this.disabled = false;
      });
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
        let zt = await this.behandelactiviteittypeConceptService
          .postTypeConcept(<BehandelactiviteittypeModel>this.behandelactiviteittype)
        this.stepService.setBehandelactiviteitypeAfterCreate();
        if (zt) {
          await this.router.navigateByUrl('behandelactiviteittype-concepten/' + zt.uuid + '/roltypes')
        }
      });
    });
  }


  ngOnInit(): void {
    this.stepService.setCodeAfterReloadFor(this.route);
    this.behandelactiviteittypeConceptService.setTypeCode(this.stepService.getCode());
    this.fetchBehandelactiviteittype()
    this.referentielijstenSelectBoxOptionsService.getObservableSelectBoxOptions("behandelactiviteittypes")
      .subscribe((selectBoxOptions: SelectBoxOption[]) => {
        this.referentietypeOptions = selectBoxOptions;
    });
  }

  getCode(): string | null {
    return this.stepService.getCode();
  }

  fetchBehandelactiviteittype() {
    return this.behandelactiviteittypeConceptService.getObservableBehandelactiviteit()
      .subscribe(ba => {
        this.behandelactiviteittype = ba;
      });
  }

}
