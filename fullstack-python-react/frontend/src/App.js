import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/tasks").then((res) => {
      setTasks(res.data.tasks);
    });
  }, []);

  const addTask = (title, description) => {
    axios
      .post("http://127.0.0.1:5000/tasks", { title, description })
      .then((res) => {
        setTasks([...tasks, res.data.task]);
      });
  };

  const updateTask = (id, updates) => {
    axios
      .put(`http://127.0.0.1:5000/tasks/${id}`, updates)
      .then((res) => {
        const index = tasks.findIndex((task) => task.id === id);
        const updatedTasks = [...tasks];
        updatedTasks[index] = res.data.task;
        setTasks(updatedTasks);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:5000/tasks/${id}`).then((res) => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}

function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <ul className="list-group mt-4">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

function Task({ task, updateTask, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, { title, description });
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  if (editing) {
    return (
      <li className="list-group-item">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      </li>
    );


  }

  return (
    <li className="list-group-item">
      <div>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger ml-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default App;

