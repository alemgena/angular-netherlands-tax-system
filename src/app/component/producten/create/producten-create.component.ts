import {Component, NgZone, OnInit} from '@angular/core';
import {TaskStepItemWrapper} from "../../../model/task-step-item-wrapper.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/producten.service";

@Component({
  selector: 'app-producten-create',
  templateUrl: './producten-create.component.html',
})
export class ProductenCreateComponent  implements OnInit {
  uuid: string | null = 'nieuw';
  loading: boolean = false
  steps: TaskStepItemWrapper[] = [
    {
      icon: "",
      label: "Producten details",
      completed: false,
      active: true,
      route: "details"
    },
    {
      icon: "",
      active:true,
      label: "Variant",
      route: "varianten"
    },
    {
      icon: "verzend",
      label: "Overzicht",
      route: "overzicht"
    }
  ]
  currentStep: number = 1;
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private ngZone: NgZone,
    protected productService: ProductService
  ) {
      router.events.subscribe(() => {
        this.setStepAndUuid()
      })
    }

  ngOnInit(): void {
    this.setUuidAfterReloadFor()
    this.productService.setUuidAfterReloadFor(this.route)
  }

  setUuidAfterReloadFor() {
    let uuid: string | null = this.productService.getUuid();
    this.uuid = uuid == "nieuw" ? "nieuw" : uuid;
  }

  nextStep() {
    if(this.currentStep == 1) {
      this.ngZone.runOutsideAngular(() => {
        const waitForChangesPromise = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 0);
        });

        waitForChangesPromise.then(() => {
          this.productService.patchProduct(this.uuid);
        });
      });
    }
    this.currentStep++;
    this.setStepInformation()

  }

  setStepInformation() {
    this.router.navigateByUrl('producten' + '/' + this.uuid + '/' + this.steps[this.currentStep - 1].route);
  }

  previousStep() {
    this.currentStep--
    this.setStepInformation();
  }

  setStepAndUuid(): void {
    let uuid: string | null = this.productService.getUuid();
    this.uuid = uuid == "nieuw" ? "nieuw" : uuid;
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
}
