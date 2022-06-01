import React, { useEffect, useState } from "react";

const SeachForm = (props) => {
  const [key, setKey] = useState("");
  const [searchValue, setSearchValue] = useState([]);
  useEffect(() => {
    setSearchValue(props.todolist);
  }, [props.todolist]);
  useEffect(() => {
    setSearchValue(props.todolist.filter((item) => item.title.includes(key)));
  }, [key]);
  const changeSearch = async (e) => {
    setKey(e.target.value);
  };

  const focus = (e) => {
    document.querySelector(".listSearch").classList.remove("isNone");
  };

  const blur = (e1) => {
    document.addEventListener("click", (e) => {
      // console.log(e.target.className);
      if (e.target.className.includes("task")) {
        let id = e.target.className.split(" ")[1];
        props.chooseTask(id);
        // console.log(id);
        document.querySelector(".listSearch").classList.add("isNone");
      } else if (e.target.className.includes("inputSearch")) {
        focus(e);
      } else {
        document.querySelector(".listSearch").classList.add("isNone");
      }
    });
  };

  return (
    <div className="search">
      <input
        className="inputSearch"
        onFocus={focus}
        type="text"
        value={key}
        placeholder="Search..."
        onChange={changeSearch}
        onBlur={blur}
      />
      <ul className="listSearch isNone">
        {searchValue.map((item) => {
          return (
            <li className={`task ${item.id}`} key={item.id}>
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SeachForm;
