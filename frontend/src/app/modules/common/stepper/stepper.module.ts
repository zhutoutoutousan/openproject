import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './components/stepper/stepper.component';
import { StepComponent } from './components/step/step.component';

@NgModule({
  declarations: [
    StepperComponent,
    StepComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    StepperComponent,
    StepComponent,
  ]
})
export class StepperModule { }
