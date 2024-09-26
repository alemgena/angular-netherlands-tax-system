import {BaseStepService} from "../../service/base-step.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskStepItemWrapper} from "../../model/task-step-item-wrapper.model";
import {NgZone} from "@angular/core";
import {ConceptBaseModel} from "../../model/concept-base.model";

export abstract class ConceptCreateBase {
  protected currentStep: number = 1;
  protected code: string = 'nieuw';
  protected loading: boolean = true;
  protected steps: TaskStepItemWrapper[] = [];
  protected stepBaseUrl: string = "";

  protected constructor(protected router: Router,
                        protected ngZone:NgZone,
                        protected route: ActivatedRoute,
                        protected stepService: BaseStepService<ConceptBaseModel>) {
    router.events.subscribe(() => {
      this.setStepAndCode()
    })
  }

  setStepAndCode(): void {
    // We initialize the current step based on the route.
    this.code = this.route.snapshot.paramMap.get('code') ?? 'nieuw'
    this.route.firstChild?.url.subscribe((value) => {
      let idx = 0
      for (const step of this.steps) {
        idx++
        if (value[0].path === step.route) {
          this.currentStep = idx
        }
      }
    })
  }

  previousStep(): void {
    this.currentStep--;
    this.setStepInformation();
  }

  nextStep(): void {
    if(this.currentStep == 1) {
      this.ngZone.runOutsideAngular(() => {
        // Create a Promise to wait for the asynchronous changes to be applied
        const waitForChangesPromise = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 0);
        });

        // Wait for the promise to resolve before making the API call
        waitForChangesPromise.then(() => {
          this.callPatchApiForStep();
        });
      });
    }
    this.currentStep++;
    this.setStepInformation();
  }

  abstract callPatchApiForStep(): void;

  setStepInformation() {
    this.stepService.setTypeCode(this.code)
    this.stepService.setStepTitle(this.steps[this.currentStep - 1].route ?? "")
    this.stepService.setDisplayTitle(this.steps[this.currentStep - 1].label ?? "")
    this.router.navigateByUrl(this.stepBaseUrl + '/' + this.code + '/' + this.steps[this.currentStep - 1].route);
  }
}
