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
import { Todo, State, Action, Add, Remove, Complete } from "./types";

export { initialState, updateState };

const initialState: State = {
  todos: [],
  currentId: 0,
};

/**
 * Adds a todo to the state.
 * @param state - The current state.
 * @param todo - The todo to be added.
 * @returns The updated state with the new todo.
 */
const addTodo = (state: State, todo: Todo): State => {
  // stops empty todo from being added
  if (todo.text === "") {
    return state;
  }
  return {
    ...state,
    todos: [...state.todos, todo],
    currentId: state.currentId + 1,
  };
};

/**
 * Removes a todo item from the state based on its id.
 * @param state - The current state of the application.
 * @param id - The id of the todo item to be removed.
 * @returns The updated state with the todo item removed.
 */
const removeTodo = (state: State, id: number): State => {
  return {
    ...state,
    todos: state.todos.filter((todo: Todo) => todo.id !== id),
  };
};

/**
 * Marks a todo as complete in the state.
 * @param state - The current state of the application.
 * @param id - The id of the todo to mark as complete.
 * @returns The updated state with the todo marked as complete.
 */
const completeTodo = (state: State, id: number): State => {
  return {
    ...state,
    todos: state.todos.map((todo: Todo) => {
      return todo.id === id ? { ...todo, done: true } : todo;
    }),
  };
};

/**
 * Updates the state based on the given action.
 * @param state - The current state of the application.
 * @param action - The action to be performed on the state.
 * @returns The updated state.
 */
const updateState = (state: State, action: Action): State => {
  if (action instanceof Add) {
    return addTodo(state, {
      id: state.currentId + 1,
      text: action.text,
      date: new Date(),
      done: false,
    });
  } else if (action instanceof Remove) {
    return removeTodo(state, action.id);
  } else {
    return completeTodo(state, action.id);
  }
};
