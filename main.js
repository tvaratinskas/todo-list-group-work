window.addEventListener("load", () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");
  const submitTodoButton = document.querySelector("#submitTodo");
  const logoutButton = document.createElement("button"); // create logout button

  const username = localStorage.getItem("username") || "";

  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    // Reset the form
    e.target.reset();

    DisplayTodos();
  });

  submitTodoButton.addEventListener("click", (e) => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn === "false") {
      e.preventDefault();
      window.location.href = "login.html";
    } else {
      // Submit the form
      newTodoForm.submit();
    }
  });

  logoutButton.innerText = "Logout"; // set the text of logout button
  logoutButton.style.color = "pink";
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", "false");
    window.location.href = "login.html";
  });
  document.querySelector("#header").appendChild(logoutButton); // append the logout button to the header

  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");
    const star = document.createElement("i");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");
    if (todo.category == "bubble weekday") {
      span.classList.add("weekday");
    } else {
      span.classList.add("weekEnd");
    }
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(star);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });

    todoItem.id = "favoriteOff";

    let favoritesBtn = document.getElementById("favoritesBtn");
    let todoListBtn = document.getElementById("todoListBtn");
    star.classList.add("fa-solid");
    star.classList.add("fa-heart");
    star.style.color = "black";
    star.style.marginLeft = "10px";
    label.style.display = "flex";
    star.style.fontSize = "50px";

    star.addEventListener("click", (e) => {
      e.preventDefault();
      todoItem.id = todoItem.id === "favoriteOn" ? "favoriteOff" : "favoriteOn";
      if (todoItem.id === "favoriteOn") {
        star.style.color = "green";
      } else if (todoItem.id === "favoriteOff") {
        star.style.color = "black";
      }
    });

    favoritesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const favoriteOffs = document.querySelectorAll("#favoriteOff");
      favoriteOffs.forEach(
        (favoriteOff) => (favoriteOff.style.display = "none")
      );
    });

    todoListBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const favoriteOffs = document.querySelectorAll("#favoriteOff");
      favoriteOffs.forEach(
        (favoriteOff) => (favoriteOff.style.display = "flex")
      );
    });
  


    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      const isLoggedIn = sessionStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        e.preventDefault();
        window.location.href = "login.html";
      } else {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      }
    });
  });
}
