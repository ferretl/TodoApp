import {Observable ,of, range, fromEvent, zip, merge } from 'rxjs'; 
import { last,filter,scan,map,mergeMap,take,takeUntil } from 'rxjs/operators';
import {Todo, State, Action} from './types';
import {RNG} from './utils';

export {initialState, createRNGFromSource};

function createRNGFromSource <T>(source$: Observable<T>) {
    return function createRngStream(seed: number = 0): Observable<number> {
        const randomNumberStream = source$.pipe(
            scan((acc:number, _: T) => RNG.hash(acc), seed)
        );
        return randomNumberStream;
    };
}


const initialState: State = {
    todos: []
};



const updateState = (state: State, action: Action): State => {
    return state;
}
