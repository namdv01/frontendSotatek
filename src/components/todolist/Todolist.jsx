import React, { useEffect, useState } from "react";
import CreateTask from "../createTask/CreateTask";
import List from "./List";

const Todolist = () => {
  const [todolist, setTodolist] = useState([]);
  const [isReceive, setReceive] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("todolist")) {
      setTodolist(JSON.parse(localStorage.getItem("todolist")));
    }
    setReceive(true);
  }, []);

  useEffect(() => {
    if (isReceive) {
      sortTask();
      localStorage.setItem("todolist", JSON.stringify(todolist));
    }
  }, [todolist]);

  const sortTask = () => {
    for (let i = 0; i < todolist.length - 1; i++) {
      for (let j = i + 1; j < todolist.length; j++) {
        if (
          parseInt(new Date(todolist[i].dueDate).getTime()) >
          parseInt(new Date(todolist[j].dueDate).getTime())
        ) {
          let tmp = todolist[j];
          todolist[j] = todolist[i];
          todolist[i] = tmp;
        }
      }
    }

    setTodolist(todolist);
  };

  const addTask = (task) => {
    let x = [...todolist, task];
    for (let i = 0; i < x.length - 1; i++) {
      for (let j = i + 1; j < x.length; j++) {
        if (
          parseInt(new Date(x[i].dueDate).getTime()) >
          parseInt(new Date(x[j].dueDate).getTime())
        ) {
          let tmp = x[j];
          x[j] = x[i];
          x[i] = tmp;
        }
      }
    }

    setTodolist(x);
  };

  const removeTask = (task) => {
    const filterList = todolist.filter((item) => item.id != task.id);
    setTodolist(filterList);
  };

  const removeMultiTask = (tasks) => {
    // console.log(tasks);
    const filterList = todolist.filter(
      (item) => !tasks.includes(item.id.toString())
    );
    setTodolist(filterList);
    // sortTask();
  };

  const updateTask = (task) => {
    const filterList = todolist.map((item) => {
      return item.id != task.id ? item : task;
    });
    setTodolist(filterList);
  };

  return (
    <div className="todolistMain">
      <CreateTask addTask={addTask} /*updateTask={updateTask}*/ />
      <List
        todolist={todolist}
        removeTask={removeTask}
        updateTask={updateTask}
        removeMultiTask={removeMultiTask}
      />
    </div>
  );
};

export default Todolist;
