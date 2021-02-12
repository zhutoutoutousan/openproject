import {NgModule} from "@angular/core";
import {OpenprojectCommonModule} from "core-app/modules/common/openproject-common.module";
import {OpModalService} from "./modal.service";
import {OpModalWrapperAugmentService} from "./modal-wrapper-augment.service";
import {OpModalHeaderComponent} from "./modal-header.component";
import {OpModalOutletComponent} from "./modal-outlet.component";

@NgModule({
  imports: [ OpenprojectCommonModule ],
  exports: [ OpModalHeaderComponent ],
  providers: [
    OpModalService,
    OpModalWrapperAugmentService,
  ],
  declarations: [
    OpModalHeaderComponent,
    OpModalOutletComponent,
  ],
})
export class OpenprojectModalModule { }
