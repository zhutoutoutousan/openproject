import {Injectable, Injector} from "@angular/core";
import {BoardListsService} from "core-app/modules/boards/board/board-list/board-lists.service";
import {Board} from "core-app/modules/boards/board/board";
import {QueryResource} from "core-app/modules/hal/resources/query-resource";
import {BoardActionService} from "core-app/modules/boards/board/board-actions/board-action.service";
import {HalResource} from "core-app/modules/hal/resources/hal-resource";
import {I18nService} from "core-app/modules/common/i18n/i18n.service";
import {buildApiV3Filter, FilterOperator} from "core-components/api/api-v3/api-v3-filter-builder";
import {CreateAutocompleterComponent} from "core-app/modules/common/autocomplete/create-autocompleter.component";
import {OpContextMenuItem} from "core-components/op-context-menu/op-context-menu.types";
import {UserResource} from 'core-app/modules/hal/resources/user-resource';
import {CurrentProjectService} from 'core-app/components/projects/current-project.service';
import {CollectionResource} from 'core-app/modules/hal/resources/collection-resource';
import {HalResourceService} from 'core-app/modules/hal/services/hal-resource.service';
import {AssigneeBoardHeaderComponent} from "core-app/modules/boards/board/board-actions/assignee/assignee-board-header.component";
import {input} from "reactivestates";
import {take} from "rxjs/operators";
import {PathHelperService} from "core-app/modules/common/path-helper/path-helper.service";
import {InjectField} from "core-app/helpers/angular/inject-field.decorator";
import {ProjectDmService} from "core-app/modules/hal/dm-services/project-dm.service";
import {ProjectResource} from "core-app/modules/hal/resources/project-resource";
import {WorkPackageChangeset} from "core-components/wp-edit/work-package-changeset";
import {WorkPackageResource} from "core-app/modules/hal/resources/work-package-resource";
import {SubprojectBoardHeaderComponent} from "core-app/modules/boards/board/board-actions/subproject/subproject-board-header.component";

@Injectable()
export class BoardSubprojectActionService extends BoardActionService {
  actionAttribute = 'subprojectId';

  private subprojects = input<HalResource[]>();

  @InjectField() public projectDmService:ProjectDmService;

  get localizedName() {
    return this.I18n.t('js.work_packages.properties.subproject');
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
    changeset.setValue('project', { href: href });
  }

  protected loadAvailable():Promise<HalResource[]> {
    const currentProjectId = this.currentProject.id!;
    this.subprojects.putFromPromiseIfPristine(() =>
      this.halResourceService
        .get(
          this.pathHelper.api.v3.projects.toPath(),
          { filters: buildApiV3Filter('ancestor', '=', currentProjectId).toJson() }
        )
        .toPromise()
        .then((collection:CollectionResource<UserResource>) => collection.elements)
    );

    return this.subprojects
      .values$()
      .pipe(take(1))
      .toPromise();
  }

}
