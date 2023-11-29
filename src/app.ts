import {Todo, State} from './interfaces';

const initialState: State = {
    todos: []
};


/**
 * Adds a todo to the state.
 * @param state - The current state.
 * @param todo - The todo to be added.
 * @returns The updated state with the added todo.
 */
function addTodo(state: State, todo: Todo): State {
    return {
        todos: [...state.todos, todo]
    };
}

/**
 * Toggles the 'done' property of a todo item in the state.
 * @param state - The current state of the application.
 * @param todo - The todo item to toggle.
 * @returns The updated state with the toggled todo item.
 */
function toggleDone(state: State, todo: Todo): State {
    return {
        todos: state.todos.map((t) => t.id !== todo.id ? t : { ...t, done: !t.done })
    }
}

/**
 * Removes a todo from the state.
 * @param state - The current state of todos.
 * @param todoToRemove - The todo to be removed.
 * @returns The updated state after removing the todo.
 */
function removeTodo (state: State, todoToRemove: Todo): State {
    return {
        todos: state.todos.filter((t: Todo) => t.id !== todoToRemove.id)
    }
}
