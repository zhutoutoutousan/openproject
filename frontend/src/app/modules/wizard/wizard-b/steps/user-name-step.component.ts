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
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnInit, Output} from "@angular/core";
import {OpModalLocalsMap} from "core-components/op-modals/op-modal.types";
import {I18nService} from "core-app/modules/common/i18n/i18n.service";
import {StateService} from "@uirouter/core";
import {BoardService} from "core-app/modules/boards/board/board.service";
import {BoardActionsRegistryService} from "core-app/modules/boards/board/board-actions/board-actions-registry.service";
import {HalResourceNotificationService} from "core-app/modules/hal/services/hal-resource-notification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPS} from "core-app/modules/wizard/wizard-b/invite-user-wizard-component-b.component";
import {of} from "rxjs";
import SubmitEvent = JQuery.SubmitEvent;


@Component({
  templateUrl: './user-name-step.component.html',
  selector: 'invite-user-name-step'
})
export class UserNameStepComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  name = this.form.get('name');

  @Output() statusChanges = this.form.statusChanges;
  @Output() nextStep = of(STEPS.EMAIL);
  @Output() onSubmit = new EventEmitter<SubmitEvent>();

  public text = {
    name: 'Name'
  };
}

