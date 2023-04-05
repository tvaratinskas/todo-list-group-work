export function deleteButtonClickListener(deleted, todoItem) {
    todos = todos.filter((t) => t !== todoItem);
    localStorage.setItem("todos", JSON.stringify(todos));
    DisplayTodos();
  }