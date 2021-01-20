//-- copyright
// OpenProject is an open source project management software.
// Copyright (C) 2012-2021 the OpenProject GmbH
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See docs/COPYRIGHT.rdoc for more details.
//++

import {OpModalComponent} from "core-components/op-modals/op-modal.component";
import {OpModalLocalsToken} from "core-components/op-modals/op-modal.service";
import {ChangeDetectorRef, Component, ElementRef, Inject, OnInit} from "@angular/core";
import {OpModalLocalsMap} from "core-components/op-modals/op-modal.types";
import {I18nService} from "core-app/modules/common/i18n/i18n.service";
import {StateService} from "@uirouter/core";
import {BoardService} from "core-app/modules/boards/board/board.service";
import {BoardActionsRegistryService} from "core-app/modules/boards/board/board-actions/board-actions-registry.service";
import {HalResourceNotificationService} from "core-app/modules/hal/services/hal-resource-notification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './invite-user-wizard.component.html'
})
export class InviteUserWizardComponent extends OpModalComponent implements OnInit {
  public showClose = true;

  public confirmed = false;

  step:'first'|'second'|'complete' = 'first';

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public text = {
    title: 'Invite user',
    button_cancel: this.I18n.t('js.button_cancel'),
    close_popup: this.I18n.t('js.close_popup_title'),

    name: 'Name',
    email: 'E-Mail',
    button_next: 'Next step'
  };

  constructor(readonly elementRef:ElementRef,
              @Inject(OpModalLocalsToken) public locals:OpModalLocalsMap,
              readonly cdRef:ChangeDetectorRef,
              readonly boardActions:BoardActionsRegistryService,
              readonly halNotification:HalResourceNotificationService,
              readonly state:StateService,
              readonly boardService:BoardService,
              readonly I18n:I18nService) {

    super(locals, cdRef, elementRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  nextStep() {
    switch (this.step) {
      case "first":
        return this.step = 'second';
      case "second":
        return this.step = 'complete';
      default:
        throw new Error("Invalid state")
    }
  }
}

