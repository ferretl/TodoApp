import {Observable, of, range, fromEvent, zip, merge } from 'rxjs'; 
import { last,filter,scan,map,mergeMap,take,takeUntil } from 'rxjs/operators';
import {Todo, State, Button, Add} from './types';
import {initialState, updateState } from './state';

/** Observables */

export function main() {
    const buttonClick$ = fromEvent<Event>(document, 'click');

    const fromButton = <T>(button: Button, result: () => T) => 
    buttonClick$.pipe(
     filter((event: Event) => (event.target as HTMLElement).id === button),
     map(result)
    );

    const getInputElement = (id: string) => document.getElementById(id) as HTMLInputElement;


    const addClick$ = fromButton('addButton', () => new Add(getInputElement('todoInput').value));

    const source$ = merge(addClick$)
    .pipe(
        scan(updateState, initialState)
    )
     .subscribe((state: State) => {
         console.log(state);
        }
    );
}

if (typeof window !== 'undefined') {
    main();
}