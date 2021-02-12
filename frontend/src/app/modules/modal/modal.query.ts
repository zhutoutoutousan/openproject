import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IModalState, OpModalStore } from './modal.store';

@Injectable()
export class OpModalQuery extends Query<IModalState> {
  modal$ = this.select();

  constructor(protected store:OpModalStore) {
    super(store);
  }
}
