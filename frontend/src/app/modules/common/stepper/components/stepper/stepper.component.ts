import {Component} from '@angular/core';
import {CdkStepper} from "@angular/cdk/stepper";

@Component({
  selector: 'op-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.sass'],
  providers: [
    {provide: CdkStepper, useExisting: StepperComponent}
  ]
})
export class StepperComponent extends CdkStepper {
}
