import {Observable, of, range, fromEvent, zip, merge } from 'rxjs'; 
import { last,filter,scan,map,mergeMap,take,takeUntil } from 'rxjs/operators';
import {Todo, State, CONSTANTS, Add} from './types';

/** Observables */

export function main() {
    console.log('Hello World');
}

if (typeof window !== 'undefined') {
    main();
}