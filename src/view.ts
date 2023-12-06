import {State, Todo} from "./types";
export {render};

function render(){
    // render each todo item to the page
    return function(state: State){
        const todoList = document.getElementById("todoList");
        // clear the list before rendering
        todoList!.innerHTML = "";
        // render each todo item
        state.todos.forEach((todo: Todo) => {

            const todoItem = document.createElement("li");

            // Create the spanm for the todo item's text
            const todoText = document.createElement("span");
            todoText.innerHTML = todo.text;
            todoItem.appendChild(todoText);

            // Crearte a Complete button
            const completeButton = document.createElement("button");
            completeButton.innerHTML = "Complete";
            completeButton.className = "completeButton";
            completeButton.setAttribute("data-id", todo.id.toString());
            todoItem.appendChild(completeButton)

            // Create a Remove button
            const removeButton = document.createElement("button");
            removeButton.innerHTML = "Remove";
            removeButton.className = "removeButton";
            removeButton.setAttribute("data-id", todo.id.toString());
            todoItem.appendChild(removeButton);

            // append the todo item to the list
            todoList!.appendChild(todoItem);

        });
    }

}