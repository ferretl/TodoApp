import {Observable, of, range, fromEvent, zip, merge } from 'rxjs'; 
import { last,filter,scan,map,mergeMap,take,takeUntil } from 'rxjs/operators';
import {Todo, State, CONSTANTS, Add} from './types';
import {createRNGFromSource} from './state';

/** Observables */

export function main() {
    const click$ = fromEvent<MouseEvent>(document, 'click');

    const rng$ = createRNGFromSource(click$);

    const addTodo$ = rng$(CONSTANTS.GLOBAL_SEED).pipe(
        map((seed: number) => new Add(seed, `Todo ${seed}`))
    )           ;
}

if (typeof window !== 'undefined') {
    alert("mike penis")
    main();
}