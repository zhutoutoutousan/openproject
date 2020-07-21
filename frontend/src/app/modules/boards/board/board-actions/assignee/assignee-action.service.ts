import {Injectable} from "@angular/core";
import {BoardActionService} from "core-app/modules/boards/board/board-actions/board-action.service";
import {HalResource} from "core-app/modules/hal/resources/hal-resource";
import {UserResource} from 'core-app/modules/hal/resources/user-resource';
import {CollectionResource} from 'core-app/modules/hal/resources/collection-resource';
import {AssigneeBoardHeaderComponent} from "core-app/modules/boards/board/board-actions/assignee/assignee-board-header.component";
import {InjectField} from "core-app/helpers/angular/inject-field.decorator";
import {ProjectDmService} from "core-app/modules/hal/dm-services/project-dm.service";
import {ProjectResource} from "core-app/modules/hal/resources/project-resource";

@Injectable()
export class BoardAssigneeActionService extends BoardActionService {
  actionAttribute = 'assignee';

  @InjectField() public projectDmService:ProjectDmService;

  public get localizedName() {
    return this.I18n.t('js.work_packages.properties.assignee');
  }

  public headerComponent() {
    return AssigneeBoardHeaderComponent;
  }

  public warningTextWhenNoOptionsAvailable() {
    let text = this.I18n.t('js.boards.add_list_modal.warning.assignee');

    return this.projectDmService
      .one(parseInt(this.currentProject.id!))
      .then((project:ProjectResource) => {
        if (project.memberships) {
          text = text.concat(
            this.I18n.t('js.boards.add_list_modal.warning.add_members', {
              link: this.pathHelper.projectMembershipsPath(this.currentProject.identifier!)
            })
          );
        }

        return text;
      });
  }

  protected loadAvailable():Promise<HalResource[]> {
    const projectIdentifier = this.currentProject.identifier!;
    console.log('this.pathHelper.api.v3.projects.id(projectIdentifier): ', this.pathHelper.api.v3.projects.id(projectIdentifier))
    return this.halResourceService
        .get(this.pathHelper.api.v3.projects.id(projectIdentifier).available_assignees)
        .toPromise()
        .then((collection:CollectionResource<UserResource>) => collection.elements);
  }
}
