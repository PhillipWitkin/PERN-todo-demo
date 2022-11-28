import logo from '../styles/logo.svg'
import '../styles/App.css';
import Todo from "./Todo";

function App(props) {

  const taskList = props.tasks.map((task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
    />
  ));

  return (
    <div className="todoapp stack-large">
    <Form addTask={addTask} />
      {/* <div className="filters btn-group stack-exception">
        {filterList}
      </div> */}
      {/* <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2> */}
      <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
      </ul>
    </div>
  );
}

export default App;
