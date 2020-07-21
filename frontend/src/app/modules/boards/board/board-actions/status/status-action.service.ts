import {Injectable} from "@angular/core";
import {Board} from "core-app/modules/boards/board/board";
import {StatusDmService} from "core-app/modules/hal/dm-services/status-dm.service";
import {StatusResource} from "core-app/modules/hal/resources/status-resource";
import {BoardActionService} from "core-app/modules/boards/board/board-actions/board-action.service";
import {StatusCacheService} from "core-components/statuses/status-cache.service";
import {InjectField} from "core-app/helpers/angular/inject-field.decorator";

@Injectable()
export class BoardStatusActionService extends BoardActionService {
  actionAttribute = 'status';

  @InjectField() statusCache:StatusCacheService;
  @InjectField() statusDm:StatusDmService;

  public get localizedName() {
    return this.I18n.t('js.work_packages.properties.status');
  }

  public addActionQueries(board:Board):Promise<Board> {
    return this.withLoadedAvailable()
      .then((results) =>
        Promise.all<unknown>(
          results.map((status:StatusResource) => {

            if (status.isDefault) {
              return this.addActionQuery(board, status);
            }

            return Promise.resolve(board);
          })
        )
          .then(() => board)
      );
  }

  public warningTextWhenNoOptionsAvailable() {
    return Promise.resolve(this.I18n.t('js.boards.add_list_modal.warning.status'));
  }

  protected loadAvailable():Promise<StatusResource[]> {
    return this.statusDm
      .list()
      .then(collection => {
        console.log(' collection.elements: ',  collection.elements)
        return  collection.elements;
      });
  }

}
