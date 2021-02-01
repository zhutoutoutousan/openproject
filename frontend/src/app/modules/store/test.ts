import {Store} from "core-app/modules/store/store";
import {Query} from "core-app/modules/store/query";
import {of} from "rxjs";
import {delay, tap} from "rxjs/operators";

interface FooState {
  foo:string;
  bar:number;
}
const store = new Store<FooState>();
const query = new Query(store);

store.update((val) => {
  return { ...val, foo: 'new foo' };
});

store.update((val) => {
  val.foo = 'foo';
  return val;
});

query
  .select('foo')
  .subscribe((foo) => {
    console.log(foo);
  });

query
  .map(state => state.bar)
  .subscribe((bar) => {
    const val = bar + 1;
  });


query
  .select('asdf')
  .subscribe((val) => {
    console.log('does not exist');
  });


const apiCall = () => {
  console.log("API CALL");
  store.setLoading(true);
  return of({ foo: 'bar', bar: 1 })
    .pipe(
      delay(1000),
      tap(() => store.setLoading(false))
  );
};

// Will call apiCall function only once
store.fromObservable(apiCall);
store.fromObservable(apiCall);
store.fromObservable(apiCall);

// Cache expires after 10 seconds
// Will again result in API call
setTimeout(() => store.fromObservable(apiCall), 12000);

// set some error from API
store.setError({ message: 'Oh noes!'});
