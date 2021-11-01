import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  Optional,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'op-form-field',
  templateUrl: './form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpFormFieldComponent {
  @HostBinding('class.op-form-field') className = true;

  @HostBinding('class.op-form-field_invalid') get errorClassName() {
    return this.showErrorMessage;
  }

  @Input() label = '';

  @Input() noWrapLabel = false;

  @Input() required = false;

  @Input() hidden = false;

  @Input() showValidationErrorOn:'change' | 'blur' | 'submit' | 'never' = 'submit';

  @Input() control?:AbstractControl;

  @Input() helpTextAttribute?:string;

  @Input() helpTextAttributeScope?:string;

  @ContentChild(NgControl) ngControl:NgControl;

  internalID = `op-form-field-${+new Date()}`;
  showErrorMessage = false;

  get errorsID() {
    return `${this.internalID}-errors`;
  }

  get descriptionID() {
    return `${this.internalID}-description`;
  }

  get describedByID() {
    return this.showErrorMessage ? this.errorsID : this.descriptionID;
  }

  get formControl():AbstractControl|undefined|null {
    return this.ngControl?.control || this.control;
  }

  private setShowErrorMessage():void {
    this.showErrorMessage = (() => {
      if (!this.formControl) {
        return false;
      }

      if (this.showValidationErrorOn === 'submit') {
        return this.formControl.invalid && this._formGroupDirective?.submitted;
      } if (this.showValidationErrorOn === 'blur') {
        return this.formControl.invalid && this.formControl.touched;
      } if (this.showValidationErrorOn === 'change') {
        return this.formControl.invalid && this.formControl.dirty;
      }

      return false;
    })();
  }

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() private _formGroupDirective:FormGroupDirective,
  ) {
    // Hacky fix for the change detection issue.
    // One problem with this is that if the formcontrol gets applied lazily or changes 
    // during the component lifecycle, that change will not be picked up.
    this.setShowErrorMessage();
    if (this.formControl) {
      this.formControl.statusChanges.subscribe(() => {
        this.setShowErrorMessage();
      });
      this.formControl.valueChanges.subscribe(() => {
        this.setShowErrorMessage();
      });
    }
  }
}
