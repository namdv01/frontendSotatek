import React, { useEffect, useState } from "react";

const UpdateTask = (props) => {
  const [task, setTask] = useState(props.item);
  useEffect(() => {
    setTask(props.item);
  }, []);

  const changeTask = (e) => {
    task[e.target.name] = e.target.value;
    setTask({ ...task });
  };

  const updateTask = (e) => {
    e.preventDefault();
    if (!task.title == "") {
      props.updateTask(task);
      window.alert("Cập nhật task thành công");
    } else {
      const oldTask = JSON.parse(localStorage.getItem("todolist")).find(
        (item) => item.id == task.id
      );
      props.updateTask(oldTask);
      setTask(oldTask);
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
          <button className="updateTaskBtn" onClick={updateTask}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
