import { Observable, of, range, fromEvent, zip, merge } from "rxjs";
import {
  last,
  filter,
  scan,
  map,
  mergeMap,
  take,
  takeUntil,
} from "rxjs/operators";
import { Todo, State, Button, Add } from "./types";
import { initialState, updateState } from "./state";
import { render } from "./view";

/**
 * The main function that initializes the application.
 */
export function main() {
  const buttonClick$ = fromEvent<Event>(document, "click");

  /**
   * Creates an observable that emits a value when a specific button is clicked.
   *
   * @template T The type of value emitted by the observable.
   * @param {Button} button The button to listen for clicks on.
   * @param {() => T} result A function that returns the value to be emitted by the observable.
   * @returns {Observable<T>} An observable that emits a value when the button is clicked.
   */
  const fromButton = <T>(button: Button, result: () => T) =>
    buttonClick$.pipe(
      filter((event: Event) => (event.target as HTMLElement).id === button),
      map(result)
    );

  /**
   * Retrieves the input element with the specified id.
   *
   * @param {string} id - The id of the input element.
   * @returns {HTMLInputElement} The HTMLInputElement with the specified id.
   */
  const getInputElement = (id: string) =>
    document.getElementById(id) as HTMLInputElement;

  const addClick$ = fromButton(
    "addButton",
    () => new Add(getInputElement("todoInput").value)
  );

  /**
   * Observable representing the source stream.
   * It merges the addClick$ stream and applies the scan operator with the updateState function and initialState.
   * Subscribes to the resulting stream and logs the state to the console.
   */
  const source$ = merge(addClick$)
    .pipe(scan(updateState, initialState))
    .subscribe((state: State) => {
      render()(state);
    });
}

if (typeof window !== "undefined") {
  main();
}
