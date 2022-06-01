import React, { useEffect, useState } from "react";
import BulkAction from "../Bulk/BulkAction";
import UpdateTask from "../createTask/UpdateTask";
import SeachForm from "../SearchForm/SeachForm";

const List = (props) => {
  const [isChecked, setChecked] = useState(false);
  const [listRemove, setListRemove] = useState([]);
  const updateTask = (task) => {
    props.updateTask(task);
  };

  useEffect(() => {
    if (isChecked) {
      document.querySelector(".bulkAction").classList.remove("isNone");
    } else {
      document.querySelector(".bulkAction").classList.add("isNone");
    }
  }, [isChecked]);

  const toggleTask = (e, id) => {
    document.querySelector(`.fullDetail-${id}`).classList.toggle("isClose");
  };

  const removeTask = async (e, task) => {
    try {
      await props.removeTask(task);
      await checkBulkShow(e);
    } catch (error) {}
  };

  const removeMultiTask = (tasks) => {
    props.removeMultiTask(tasks);
  };

  const checkBulkShow = (e) => {
    var checkboxs = [...document.querySelectorAll(".checkbox")];
    var check = checkboxs.some((item) => {
      return item.checked;
    });
    var checkList = checkboxs.filter((item) => item.checked);
    checkList = checkList.map((item) => item.name);
    setListRemove(checkList);
    setChecked(check);
  };

  const chooseTask = (id) => {
    document
      .querySelectorAll(".border-1")
      .forEach((item) => item.classList.add("isClose"));
    // console.log("đã chọn");
    document.querySelector(`.fullDetail-${id}`).classList.remove("isClose");
  };

  return (
    <div className="listMain">
      <h3>To Do List</h3>
      <SeachForm todolist={props.todolist} chooseTask={chooseTask} />
      {props.todolist.map((item) => {
        return (
          <div className="itemInList" key={item.id}>
            <div className="trailer">
              <div className="trailerLeft">
                <input
                  type="checkbox"
                  name={item.id}
                  id=""
                  className="checkbox"
                  onClick={checkBulkShow}
                />
                <h4>{item.title}</h4>
              </div>
              <div className="trailerRight">
                <button
                  className="detailBtn"
                  onClick={(e) => {
                    toggleTask(e, item.id);
                  }}
                >
                  Detail
                </button>
                <button
                  className="removeBtn"
                  onClick={(e) => {
                    removeTask(e, item);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className={`fullDetail-${item.id} isClose border-1`}>
              <UpdateTask item={item} updateTask={updateTask} />
            </div>
          </div>
        );
      })}

      <BulkAction
        removeMultiTask={removeMultiTask}
        listRemove={listRemove}
        setListRemove={setListRemove}
        setChecked={setChecked}
      />
    </div>
  );
};

export default List;
