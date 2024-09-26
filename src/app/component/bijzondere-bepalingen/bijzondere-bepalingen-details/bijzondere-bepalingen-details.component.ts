import {Component, NgZone, OnInit} from '@angular/core';

import {BijzondereBepalingService} from "../../../service/bijzondere-bepaling.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AantalTermijnen, BijzondereBepalingtypeModel, TermijnType} from "../../../model/bijzondereBepalingtype.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './bijzondere-bepalingen-details.component.html',
  styleUrls: ['./bijzondere-bepalingen-details.component.css']
})
export class BijzondereBepalingenDetailsComponent implements OnInit {
  bijzondereBepalingType: BijzondereBepalingtypeModel | null = null;
  bijzondereBepalingenForm!: FormGroup
  termijnTypeOptions: any = [
    {
      title: "Verlenging",
      value: TermijnType.VERLENGING
    },
    {
      title: "Opschorting",
      value: TermijnType.OPSCHORTING
    },
    {
      title: "Verdaging",
      value: TermijnType.VERDAGING
    },
  ];
  aantalTermijnenOptions: any = [
    {
      title: "Een",
      value: AantalTermijnen.EEN
    },
    {
      title: "Twee",
      value: AantalTermijnen.TWEE
    },
    {
      title: "Meer dan twee",
      value: AantalTermijnen.MEER_DAN_TWEE
    },
  ];

  constructor(private bijzondereBepalingService: BijzondereBepalingService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    let uuid: String | null = this.route.snapshot.paramMap.get('uuid');
    this.initForm();
    uuid = uuid == "nieuw" ? null : uuid;

    this.bijzondereBepalingService.getBijzondereBepaling(uuid)
      .then(result => {
        this.bijzondereBepalingType = result;
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
      waitForChangesPromise.then(() => {
        this.bijzondereBepalingService.saveBijzondereBepaling(<BijzondereBepalingtypeModel>this.bijzondereBepalingType)
          .then(()=> {
            this.router.navigateByUrl('bijzondere-bepalingen')
          });
      });
    });
  }

  initForm(): void {
    this.bijzondereBepalingenForm = this.formBuilder.group({
      reden: [this.bijzondereBepalingType?.reden, [Validators.minLength(1), Validators.maxLength(200)]],
      eersteTermijn: [this.bijzondereBepalingType?.eersteTermijn, [Validators.min(0), Validators.max(999), Validators.required,Validators.pattern("^[0-9]*$")]],
      opvolgendeTermijn: [this.bijzondereBepalingType?.opvolgendeTermijn, [Validators.min(0), Validators.max(999), Validators.pattern("^[0-9]*$")]],
      aantal: [this.bijzondereBepalingType?.aantal, [Validators.min(0), Validators.max(20)]],
      type: [this.bijzondereBepalingType?.type, [Validators.minLength(0), Validators.maxLength(20)]],
    });
  }
}
