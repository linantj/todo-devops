"use client";

import { useState, type FormEvent } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draft, setDraft] = useState("");
  const openCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - openCount;

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = draft.trim();

    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
    setDraft("");
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  return (
    <main className="app-shell">
      <section className="todo-app" aria-labelledby="app-title">
        <header className="app-header">
          <div>
            <p className="eyebrow">PERSONAL WORKSPACE</p>
            <h1 id="app-title">My ToDo App</h1>
          </div>
          <div className="task-total" aria-label={`${tasks.length} total tasks`}>
            <span className="task-total-number">
              {String(tasks.length).padStart(2, "0")}
            </span>
            <span>{tasks.length === 1 ? "task" : "tasks"}</span>
          </div>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <label className="sr-only" htmlFor="new-task">
            New task
          </label>
          <input
            id="new-task"
            name="task"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.currentTarget.value)}
            placeholder="What needs to get done?"
            autoComplete="off"
            required
          />
          <button className="add-task-button" type="submit">
            Add Task
          </button>
        </form>

        <section className="task-list-section" aria-labelledby="task-list-title">
          <div className="task-list-heading">
            <h2 id="task-list-title">Tasks</h2>
            <p>
              {openCount} open <span aria-hidden="true">/</span> {completedCount} completed
            </p>
          </div>

          {tasks.length === 0 ? (
            <p className="empty-state">No tasks yet.</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li
                  className={`task-row${task.completed ? " is-completed" : ""}`}
                  key={task.id}
                >
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark ${task.title} ${task.completed ? "as incomplete" : "as complete"}`}
                  />
                  <span className="task-title">{task.title}</span>
                  <button
                    className="delete-task-button"
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}
