import { deleteButtonClickListener } from "./delete.js";

import { JSDOM } from "jsdom";

const dom = new JSDOM("<html><body></body></html>");

describe("deleteButtonClickListener", () => {
  test("delete button", () => {
    const dom = new JSDOM(`<!DOCTYPE html><div id="delete"></div>`);
    const deleteButton = dom.window.document.getElementById("delete");
    const todoItem = { id: "todo1", task: "Buy groceries" };
    const event = new dom.window.Event("click", { bubbles: true });

    deleteButton.addEventListener("click", () => {
      deleteButtonClickListener(deleteButton, todoItem);
    });
  });
});
