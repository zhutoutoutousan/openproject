import {Observable, pipe} from "rxjs";
import {Store, StoreError} from "core-app/modules/store/store";
import {map} from "rxjs/operators";

export class Query<T> {
  constructor(readonly store:Store<T>) {
  }

  public select<K extends keyof T>(select:K & keyof T):Observable<T[K]> {
    return this
      .store
      .state$
      .pipe(
        pipe(
          map(state => state[select])
        )
      );
  }

  public pick<K extends keyof T>(select:(K & keyof T)[]):Observable<Pick<T, K>> {
    return this
      .store
      .state$
      .pipe(
        pipe(
          map(state => _.pick(state, select))
        )
      );
  }

  public map<R>(selectFn:(state:Readonly<T>) => R):Observable<R> {
    return this
      .store
      .state$
      .pipe(
        pipe(
          map(selectFn)
        )
      );
  }

}