export { Todo, State, Action,CONSTANTS, Add, Remove, Complete };

const CONSTANTS = {
    GLOBAL_SEED: new Date().getMilliseconds()
}


type Todo = Readonly<{
    id: number;
    text: string;
    done: boolean;
}>;

type State = Readonly < {
    todos: Todo[]; // The list of todos
    currentId: number; // The current id
}>;
/**
 * The action type 
 */
type Action = Add | Remove | Complete;


/**
 * Adds a todo
 */
class Add {
    constructor(
        public readonly id:number, 
        public readonly text: string
        ) {}
}

/**
 * Removes a todo
 */
class Remove {
    constructor(public readonly id: number) {}
}

/**
 * Completes a todo
 */
class Complete {
    constructor(public readonly id: number) {}
}