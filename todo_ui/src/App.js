// import logo from '../styles/logo.svg'
import React, { useState, useRef, useEffect } from "react";
import './styles/App.css';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
// import { nanoid } from "nanoid";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const ApiUrl = "http://localhost:8001";

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function addTask(name) {
    console.log("Adding task name: ", name);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, completed: false })
    };
    fetch(ApiUrl + "/tasks", requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            
            const newTask = { id: data.id, name: data.name, completed: false };
            setTasks([...tasks, newTask]);

        })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    // const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    // setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    console.log("Toggling todo id:", id);
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }


  function editTask(id, newName) {
    // PUT request to /tasks/id
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, name: newName })
    };
    fetch(ApiUrl + `/tasks/${id}`, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            
            const editedTaskList = tasks.map(task => {
              // if this task has the same ID as the edited task
                if (id === task.id) {
                  return {...task, name: newName}
                }
                return task;
              });
            setTasks(editedTaskList);

        })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });

  }


  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    // fetch(ApiUrl + "/tasks")
    //     .then(response => response.json())
    //     .then(data => this.setTasks(data));
    
    fetch(ApiUrl + "/tasks")
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            setTasks(data);
            if (tasks.length - prevTaskLength === -1) {
              listHeadingRef.current.focus();
            }
        })
        .catch(error => {
            // this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });

    // if (tasks.length - prevTaskLength === -1) {
    //   listHeadingRef.current.focus();
    // }
  }, [tasks.length, prevTaskLength]);


  return (
    <div className="todoapp stack-large">
    <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
          // role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
      </ul>
    </div>
  );
}

export default App;
