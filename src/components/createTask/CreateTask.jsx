import React, { useEffect, useState } from "react";

const CreateTask = (props) => {
  const initTask = {
    id: 0,
    title: "",
    dueDate: new Date().toISOString().split("T")[0],
    description: "",
    priority: "normal",
  };

  const [task, setTask] = useState(initTask);

  const changeTask = (e) => {
    task[e.target.name] = e.target.value;
    setTask({ ...task });
  };

  const createTask = (e) => {
    e.preventDefault();
    if (!task.title == "") {
      task.id = Math.floor(Math.random() * 9999) + 1000;
      setTask({ ...task });
      props.addTask(task);
      setTask(initTask);
      window.alert("Tạo task thành công");
    } else {
      window.alert("Vui lòng không để title trống!");
    }
  };

  return (
    <div className="createTaskMain">
      <h3 className="headerCreate">New tasks</h3>
      <form action="">
        <div className="line">
          <input
            className="formAddTask"
            type="text"
            name="title"
            value={task.title}
            onChange={changeTask}
            placeholder="Add new task..."
            required
          />
        </div>

        <div className="line">
          <div className="description">
            <h4>Description</h4>
            <textarea
              className="formAddTask"
              name="description"
              value={task.description}
              onChange={changeTask}
              id=""
            ></textarea>
          </div>
        </div>
        <div className="line">
          <div className="duedate">
            <h4>Due Date</h4>
            <input
              min={new Date().toISOString().split("T")[0]}
              type="date"
              name="dueDate"
              id=""
              value={task.dueDate}
              onChange={changeTask}
            />
          </div>

          <div className="priority">
            <h4>Priority</h4>
            <select
              name="priority"
              id=""
              value={task.priority}
              onChange={changeTask}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="line">
          <button className="addTaskBtn" onClick={createTask}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
