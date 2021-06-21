import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from "core-app/shared/components/icon/icon.module";
import { InAppNotificationBellComponent } from "core-app/features/in-app-notifications/bell/in-app-notification-bell.component";
import { InAppNotificationCenterComponent } from './center/in-app-notification-center.component';
import { OpenprojectModalModule } from "core-app/shared/components/modal/modal.module";
import { InAppNotificationEntryComponent } from "core-app/features/in-app-notifications/entry/in-app-notification-entry.component";

@NgModule({
  declarations: [
    InAppNotificationBellComponent,
    InAppNotificationCenterComponent,
    InAppNotificationEntryComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    OpenprojectModalModule,
  ]
})
export class OpenProjectInAppNotificationsModule { }