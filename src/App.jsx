import React, { useState } from "react";
import './App.css'

const App = () => {
  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState([])
  const [editIndix, setEditIndex] = useState(null)

  const control = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTaskList([...taskList, task])
    setTask("");

    if (editIndix !== null) {
      const updatedList = [...taskList];
      updatedList[editIndix].text = task;
      setTaskList(updatedList);
      setEditIndex(null);
    } else {
      setTaskList([...taskList, { text: task, completed: false }]);
    }
    setTask("");
  }

  const deleteTask = (index) => {
    const updatedList = [...taskList];
    updatedList.splice(index, 1);
    setTaskList(updatedList);

    if (index === editIndix) {
      setEditIndex(null);
      setTask("");
    }
  };

  const editTask = (index) => {
    const updatedList = [...taskList];
    updatedList[index].completed = false;
    setTaskList(updatedList);
    setTask(taskList[index].text)
    setEditIndex(index);
  }

  const toggleComplete = (index) => {
    const updated = [...taskList];
    updated[index].completed = !updated[index].completed;
    setTaskList(updated);
  };


  return (
    <div className="container">
      <div className="todo-app">
        <h2> To-Do List</h2>
        <form className="row" onSubmit={control}>
          <input type="text" value={task} placeholder="Add your task" onChange={(e) => setTask(e.target.value)} />
          <button type="submit">
            {editIndix !== null ? "UPDATE" : "ADD"}
          </button>
        </form>
        <ul>
          {taskList.map((item, index) => (
            <li key={index} className={item.completed ? "completed" : ""}>

              <div className="left">
                <span
                  className={`circle ${item.completed ? 'completed' : ''}`}
                  onClick={() => toggleComplete(index)}
                ></span>

                <span className="task-text">{item.text}</span>
              </div>


              <div className="actions">
                <button className="edit-btn" onClick={() => editTask(index)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteTask(index)}>
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;