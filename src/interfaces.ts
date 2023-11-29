export { Todo, State };

interface Todo {
    id: number;
    text: string;
    done: boolean;
};

interface State {
    todos: Todo[];
};
