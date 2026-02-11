import { test, expect } from "@playwright/test";

test.describe("Playwright TodoMVC Full E2E Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
    await expect(page.getByPlaceholder("What needs to be done?")).toBeVisible();
  });

  test("Add multiple todos", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Buy milk");
    await input.press("Enter");
    await input.fill("Walk dog");
    await input.press("Enter");
    await input.fill("Learn Playwright");
    await input.press("Enter");

    const todos = page.locator(".todo-list li");
    await expect(todos).toHaveCount(3);
  });

  test("Toggle a todo", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Complete assignment");
    await input.press("Enter");

    const todo = page.locator(".todo-list li").first();
    await todo.locator(".toggle").check();
    await expect(todo).toHaveClass(/completed/);
  });

  test("Edit a todo", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Old Todo");
    await input.press("Enter");

    const firstTodo = page.locator(".todo-list li").first();
    await firstTodo.dblclick();

    const editField = firstTodo.locator(".edit");
    await editField.fill("Updated Todo");
    await editField.press("Enter");

    await expect(firstTodo).toContainText("Updated Todo");
  });

  test("Delete a todo", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Buy groceries");
    await input.press("Enter");

    const todo = page.locator(".todo-list li").first();
    await todo.hover();
    await todo.locator(".destroy").click();

    await expect(page.locator(".todo-list li")).toHaveCount(0);
  });

  test("Filter: Active", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Task 1");
    await input.press("Enter");
    await input.fill("Task 2");
    await input.press("Enter");

    const todos = page.locator(".todo-list li");

    await todos.nth(0).locator(".toggle").check();

    await page.getByRole("link", { name: "Active" }).click();

    await expect(page.locator(".todo-list li")).toHaveCount(1);
    await expect(todos.first()).toContainText("Task 2");
  });

  test("Filter: Completed", async ({ page }) => {
  const input = page.getByPlaceholder("What needs to be done?");
  await input.fill("A");
  await input.press("Enter");
  await input.fill("B");
  await input.press("Enter");

  const todos = page.locator(".todo-list li");

  // mark B as completed
  await todos.nth(1).locator(".toggle").check();

  // click Completed filter
  await page.getByRole("link", { name: "Completed" }).click();

  // check only visible completed items
  await expect(page.locator(".todo-list li:visible")).toHaveCount(1);
  await expect(page.locator(".todo-list li:visible").first()).toContainText("B");
});

  test("Clear completed button", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("Clean room");
    await input.press("Enter");
    await input.fill("Cook food");
    await input.press("Enter");

    const todos = page.locator(".todo-list li");

    await todos.nth(0).locator(".toggle").check();

    await page.getByRole("button", { name: "Clear completed" }).click();

    await expect(page.locator(".todo-list li")).toHaveCount(1);
  });

  test("Check footer count", async ({ page }) => {
    const input = page.getByPlaceholder("What needs to be done?");
    await input.fill("One");
    await input.press("Enter");
    await input.fill("Two");
    await input.press("Enter");

    await expect(page.locator(".todo-count")).toContainText("2");
  });

  test("Full page screenshot", async ({ page }, testInfo) => {
    const output = testInfo.outputPath("todomvc-snap.png");
    await page.screenshot({ path: output, fullPage: true });

    await expect(page.locator("footer.info")).toBeVisible();
  });
});