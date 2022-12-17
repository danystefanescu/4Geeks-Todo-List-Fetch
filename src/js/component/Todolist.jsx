import React, { useState, useEffect } from "react";

const Todolist = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  const getTasks = async () => {
    const url =
      "https://assets.breatheco.de/apis/fake/todos/user/danystefanescu";
    const request = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, request);
    const responseJson = await response.json();
    responseJson.map((task) => {
      setList((x) => [...x, task.label]);
    });
  };

  const putTasks = async (tasks) => {
    const url =
      "https://assets.breatheco.de/apis/fake/todos/user/danystefanescu";
    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    };
    const response = await fetch(url, request);
    const responseJSON = await response.json();
  };

  //Funcion para agregar el input.
  const addTask = (event) => {
    event.preventDefault();
    if (inputValue === "") return;
    else {
      let tasksPut = [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        let item = {};
        item["label"] = element;
        item["done"] = false;
        tasksPut.push(item);
      }
      tasksPut.push({ label: inputValue, done: false });
      putTasks(tasksPut);
      setList([...list, inputValue]);
      setInputValue("");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  //Funcion para borrar elementos segun id.
  const deleteTask = (index) => {
    setList(
      list.filter((element, id) => {
        return index !== id;
      })
    );
  };

  return (
    <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
      <h1 className="text-center text-primary">Tasks to do</h1>
      <div className="mb-3">
        <form onSubmit={addTask}>
          <input
            className="form-control text-center"
            placeholder="Add a new task please"
            type="text"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </form>
      </div>
      <h2 className="text-success">To do list</h2>
      <div className="list">
        <ul className="list-group">
          {list.map((listElement, index) => {
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between hidden-icon"
              >
                {listElement}
                <span>
                  <a
                    key={index}
                    onClick={(event) => {
                      deleteTask(index);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </a>
                </span>
              </li>
            );
          })}
          <span className="list-group-item bg-light  text-danger text-end fw-lighter">
            {list.length === 0
              ? "No tasks, add a new task please"
              : list.length + " Item Left"}
          </span>
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
