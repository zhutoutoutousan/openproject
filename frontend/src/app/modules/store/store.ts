import {input} from "reactivestates";
import {whenDebugging} from "core-app/helpers/debug_output";
import {BehaviorSubject, concat, Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {shareReplay, take} from "rxjs/operators";

export interface StoreError {
  code?:string;
  message:string;
}

export class Store<T> {
  private state = input<T>();

  private _isLoading$ = new BehaviorSubject<boolean>(false);

  private _error$ = new BehaviorSubject<StoreError|null>(null);

  protected cacheDurationInMs = 10 * 1000;

  constructor(init?:T) {
    if (init) {
      this.update(() => init)
    }
  }

  /**
   * Update the state with a reducer
   * @param reducer
   */
  public update(reducer:(current:Readonly<T>) => T) {
    this.state.doModify((value) => {
      return reducer(this.freezeInDevelopment(value));
    })
  }

  /**
   * Returns whether the state
   * @param id ID of the state
   * @return {boolean}
   */
  public stale():boolean {
    // If there is an active request that is still pending
    if (this.state.hasActivePromiseRequest()) {
      return false;
    }

    return this.state.isPristine() || this.state.isValueOlderThan(this.cacheDurationInMs);
  }

  public fromObservable(loader:() => Observable<T>, force:boolean = false):Observable<T> {
    // Refresh when stale or being forced
    if (this.stale() || force) {
      const observable = loader()
        .pipe(
          take(1),
          shareReplay(1)
        );

      this
        .state
        .clearAndPutFromPromise(observable.toPromise());

      // Return concat of the loading observable
      // for error handling and the like,
      // but then continue with the streamed cache
      return concat<T>(
        observable,
        this.state.values$()
      );
    }

    return this.state.values$();
  }

  public get state$():Observable<Readonly<T>> {
    return this.state.values$();
  }

  public get error$():Observable<Readonly<StoreError|null>> {
    return this._error$.asObservable();
  }

  public setError(error:StoreError) {
    this._error$.next(error);
  }

  public clearError() {
    this._error$.next(null);
  }

  public setLoading(loading:boolean) {
    this._isLoading$.next(loading);
  }

  private freezeInDevelopment(val:T):T {
    if (environment.production) {
      return val;
    } else {
      return Object.freeze(val);
    }
  }

}