import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {EigenschappenService} from "../../../service/eigenschappen.service";
import {EigenschapModel, Formaat} from "../../../model/eigenschap.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './eigenschappen-details.component.html',
  styleUrls: ['./eigenschappen-details.component.scss']
})
export class EigenschappenDetailsComponent implements OnInit {
  eigenschappenForm!: FormGroup
  eigenschappen: EigenschapModel | null = null;
  waardenverzameling: string = '';

  formaatEnum: any = [
    {
      title: "Tekst",
      value: Formaat.TEKST
    },
    {
      title: "Getal",
      value: Formaat.GETAL
    },
    {
      title: "Datum",
      value: Formaat.DATUM
    },
    {
      title: "Datum_Tijd",
      value: Formaat.DATUM_TIJD
    },
  ];

  constructor(private eigenschappenService: EigenschappenService,
              private router: Router,
              private route: ActivatedRoute,
              private cde: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    let uuid: String | null = this.route.snapshot.paramMap.get('uuid');
    uuid = uuid == "nieuw" ? null : uuid;
    this.initForm();
    this.eigenschappenService.getEigenschap(uuid)
      .then(result => {
        this.eigenschappen = result;
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
        let eig = await this.eigenschappenService.saveEigenschap(<EigenschapModel>this.eigenschappen)
        if (eig) {
          this.router.navigateByUrl('eigenschappen')
        }
      });
    });
  }

  addWaardenverzameling() {
    if(this.waardenverzameling !== '' && this.waardenverzameling.length <= 20) {
      this.eigenschappen?.waardenverzameling.push({waarde: this.waardenverzameling})
    }

    this.waardenverzameling = ''
  }

  updateWaardenverzameling(newValue: string) {
      this.waardenverzameling = newValue.trim();
  }

  remove(element: number) {
    this.eigenschappen?.waardenverzameling.splice(element, 1);
  }

  initForm(): void {
    this.eigenschappenForm = this.formBuilder.group({
      naam: [this.eigenschappen?.naam, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      definitie: [this.eigenschappen?.definitie, [Validators.minLength(1), Validators.maxLength(255)]],
      formaat: [this.eigenschappen?.formaat, Validators.required],
      lengte: [this.eigenschappen?.lengte, [Validators.min(1), Validators.max(999)]],
      kardinaliteit: [this.eigenschappen?.kardinaliteit, [Validators.min(1), Validators.max(999)]],
    });
  }
  }
