import {Injectable} from "@angular/core";
import {QueryResource} from "core-app/modules/hal/resources/query-resource";
import {BoardActionService} from "core-app/modules/boards/board/board-actions/board-action.service";
import {HalResource} from "core-app/modules/hal/resources/hal-resource";
import {buildApiV3Filter} from "core-components/api/api-v3/api-v3-filter-builder";
import {input} from "reactivestates";
import {publishReplay, refCount, take} from "rxjs/operators";
import {InjectField} from "core-app/helpers/angular/inject-field.decorator";
import {WorkPackageChangeset} from "core-components/wp-edit/work-package-changeset";
import {WorkPackageResource} from "core-app/modules/hal/resources/work-package-resource";
import {SubprojectBoardHeaderComponent} from "core-app/modules/boards/board/board-actions/subproject/subproject-board-header.component";
import {TypeDmService} from "core-app/modules/hal/dm-services/type-dm.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class BoardSubtaskActionService extends BoardActionService {
  actionAttribute = 'parent';

  @InjectField() typeDm:TypeDmService;

  get localizedName() {
    return this.I18n.t('js.work_packages.properties.subtask');
  }

  headerComponent() {
    return SubprojectBoardHeaderComponent;
  }

  // TODO need permission for user on subproject
  canMove(workPackage:WorkPackageResource):boolean {
    return true;
  }

  // TODO assign subproject to changeset
  assignToWorkPackage(changeset:WorkPackageChangeset, query:QueryResource) {
    const href = this.getFilterHref(query);
    changeset.setValue('parent', { href: href });
  }

  protected async loadAvailable():Promise<HalResource[]> {
    const currentProjectId = this.currentProject.id!;
    console.log('this.currentProject: ', this.currentProject);

    const allTypes = await this.typeDm.loadAll(currentProjectId);
    const validTypesIds = allTypes.filter(type => !type.isMilestone).map(type => type.id);
    const potentialParentAvailable = await this.halResourceService
      .get(
        this.pathHelper.api.v3.withOptionalProject(currentProjectId).work_packages.toPath(),
        { filters: buildApiV3Filter('type', '=', validTypesIds).toJson() }
      )
      // { filters: buildApiV3Filter('is_milesone', '=', 'f').toJson() } (after rebase on dev)
      .toPromise()
      .then(collection => collection.elements);

    console.log('potentialParentAvailablePromise', potentialParentAvailable);

    return potentialParentAvailable;
  }
}