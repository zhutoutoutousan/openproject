import {Component, forwardRef} from '@angular/core';
import {CdkStep} from "@angular/cdk/stepper";

@Component({
  selector: 'op-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.sass'],
  providers: [
    {provide: CdkStep, useExisting: forwardRef(() => StepComponent)}
  ]
})
export class StepComponent extends CdkStep {
}
