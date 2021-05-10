import { Component } from '@angular/core';
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: 'op-dynamic-field-wrapper',
  templateUrl: './dynamic-field-wrapper.component.html',
  styleUrls: ['./dynamic-field-wrapper.component.sass'],
})
export class DynamicFieldWrapperComponent extends FieldWrapper {
}
