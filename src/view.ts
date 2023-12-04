import {main} from "./app";
import {State, Todo} from "./types";
export {render};

function render(){
    // render each todo item to the page
    return function(state: State){
        const todoList = document.getElementById("todoList");
        todoList!.innerHTML = "";
        state.todos.forEach((todo: Todo) => {
            const todoItem = document.createElement("li");
            todoItem.innerHTML = todo.text;
            todoList!.appendChild(todoItem);
        });
    }

}