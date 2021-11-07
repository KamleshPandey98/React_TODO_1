import { React, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     newItem: "",
  //     list: [],
  //   };
  // }

  const getLocalData = () => {
    const data = localStorage.getItem("myTodo");
    return data
      ? { newItem: "", list: JSON.parse(data) }
      : { newItem: "", list: [] };
  };

  const [values, setValues] = useState(getLocalData());
  const { newItem, list } = values;
  const [isAddBtnTxt, setIsAddBtnTxt] = useState(true);
  const [itemToUpdate, setItemToUpdate] = useState({});

  useEffect(() => {
    newItem
      ? localStorage.setItem("myTodo", JSON.stringify(list))
      : localStorage.setItem("myTodo", JSON.stringify(list));
  }, [values.list]);

  const addItem = (todoValue) => {
    if (todoValue != null) {
      if (isAddBtnTxt) {
        const newItem = {
          id: Date.now(),
          valuee: todoValue,
          isDone: false,
        };
        const list = [...values.list];
        list.push(newItem);
        setValues({
          newItem: "",
          list,
        });
      } else {
        list.find((element, index) => {
          if (element.id == itemToUpdate.id) {
            return (list[index] = { ...element, valuee: newItem });
          }
        });
        setValues({ newItem: "", list: [...list] });
      }
      setIsAddBtnTxt(true);
    }
  };

  const deleteItem = (id) => {
    const list = [...values.list];
    const updatedList = list.filter((item) => item.id != id);
    setValues({
      ...values,
      list: updatedList,
    });
  };

  const userInput = (input) => {
    setValues({ ...values, newItem: input });
  };

  const taskDone = (id) => {
    list.find((element, index) => {
      if (element.id == id) {
        return (list[index] = { ...element, isDone: !element.isDone });
      }
    });
    setValues({ ...values, list: [...list] });
  };

  const editTask = (item) => {
    setItemToUpdate(item);
    setValues({ ...values, newItem: item.valuee });
    setIsAddBtnTxt(false);
  };

  // const render = () => {
  return (
    <div>
      <img src={logo} width="100" height="100" className="logo" />
      <h1 className="app-title">Kamlesh ToDo App</h1>
      <div className="container">
        Add an Item....
        <br />
        <input
          type="text"
          className=""
          placeholder="Write a Todo"
          size={30}
          required
          value={values.newItem}
          style={{ height: "30px" }}
          onChange={(e) => userInput(e.target.value)}
        />
        <button
          className="add-btn"
          onClick={() => addItem(values.newItem)}
          disabled={!values.newItem.length}
        >
          {isAddBtnTxt ? "ADD TODO" : "UPDATE TODO"}
        </button>
        <div className="list">
          <ul>
            {values.list.map((item) => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    name="isDone"
                    checked={item.isDone}
                    onChange={() => taskDone(item.id)}
                  />
                  {item.valuee}
                  <button
                    type="button"
                    className="btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => editTask(item)}
                  >
                    Edit
                  </button>
                </li>
              );
            })}
            <li>
              <input type="checkbox" name="" id="" />
              React TODO Application.
              {/* <button className="btn">Delete</button> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
  // };
};

export default App;
