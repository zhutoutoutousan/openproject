import { Injectable, InjectionToken } from '@angular/core';
import { OpModalStore } from './modal.store';
import { OpModalQuery } from './modal.query';

export const OP_MODAL_DATA = new InjectionToken<any>('OpModalData');

export interface OpModalComponent {
}

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
export class OpModalService {
  modal$ = this.query.modal$;

  constructor(
    private store:OpModalStore,
    private query:OpModalQuery,
  ) {}

  open(component:OpModalComponent, data?:any) {
    this.store.update(state => ({
      data,
      component,
    }));
  }

  close() {
    this.store.update({
      data: null,
      component: null,
    });
  }
}
