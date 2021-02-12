import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface OpModalComponent {}

export interface IModalState {
  data:any;
  component:OpModalComponent|null;
}

export function createInitialState():IModalState {
  return {
    data: null,
    component: null,
  };
}

@Injectable()
@StoreConfig({ name: 'modal' })
export class OpModalStore extends Store<IModalState> {
  constructor() {
    super(createInitialState());
  }
}
