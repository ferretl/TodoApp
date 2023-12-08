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
import { Todo, State, Button, Add, Remove, Complete } from "./types";
import { initialState, updateState } from "./state";
import { render } from "./view";

/**
 * The main function that initializes the application.
 */
export function main() {
  const buttonClick$ = fromEvent<Event>(document, "click");

  // Creates an observable that emits a value when a specific button is clicked.
  const fromButton = <T>(button: Button, result: (event: Event) => T) =>
    buttonClick$.pipe(
      filter((event: Event) => (event.target as HTMLElement).id === button),
      map(result)
    );

  // Gets the input element with the specified id.
  const getInputElement = (id: string) =>
    document.getElementById(id) as HTMLInputElement;

  // Creates an observable that emits a value when the addButton is clicked.
  const addClick$ = fromButton(
    "addButton",
    () => new Add(getInputElement("todoInput").value)
  );

  // Creates an observable that emits a value when the removeButton is clicked.
  const removeClick$ = fromButton("removeButton", (event: Event) => {
    const id = parseInt((event.target as HTMLElement).getAttribute("data-id")!);
    return new Remove(id);
  });

  /*
   *Creates an observable that emits a value when the completeButton
   *is clicked.
   */
  const completeClick$ = fromButton("completeButton", (event: Event) => {
    const id = parseInt((event.target as HTMLElement).getAttribute("data-id")!);
    return new Complete(id);
  });

  /**
   * Observable representing the page load event.
   * It applies the scan operator with the initialState and renders the initial
   * state to the page.
   */
  const pageLoad$ = fromEvent<Event>(window, "load").pipe(
    scan((state: State) => state, initialState)
  );

  pageLoad$.subscribe((state: State) => {
    render()(state);
  });

  /**
   * Observable representing the source stream.
   * It merges the addClick$ stream and applies the scan operator with the
   *  updateState function and initialState.
   * Subscribes to the resulting stream and logs the state to the console.
   */
  const source$ = merge(addClick$, removeClick$, completeClick$).pipe(
    scan(updateState, initialState)
  );

  source$.subscribe((state: State) => {
    render()(state);
  });
}

if (typeof window !== "undefined") {
  main();
}
