const dbConn = require('./db/dbConn');
const pool = dbConn.getPool();

// Create and Save a new Task
exports.create = async (req, res) => {
  console.log("Creating task...");
    // Validate request
  if (!req.body.name) {
    console.log("Creating new task from request body:",req.body);
    res.status(500).send({
      message: "Content can not be empty!"
    });
  }

  try {
    // Create a new Todo task
    const task = {
      name: req.body.name,
      completed: req.body.completed || false
    };
    // Save Task
    const insertTodoQuery = `
    INSERT INTO todos (name, completed)
    VALUES ($1, $2)
    RETURNING *;
  `;
    const result = await pool.query(insertTodoQuery, [task.name, task.completed]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all Tasks from the database.
exports.findAll = async (req, res) => {
  console.log("Retrieving all tasks...")
  // res.set("Access-Control-Allow-Origin", "*"); 
  try {
    const result = await pool.query('SELECT * FROM todos;');
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a Task by the id in the request
exports.update = async (req, res) => {
  console.log("Updating task...");
  // if (!req.body.name) {
  //   console.log("No task name provided");
  //   return res.status(500).send({
  //     message: "Content can not be empty!"
  //   });
  // }
  
  // if (!Number.isInteger(req.params.id)){
  //   res.status(404).json({ error: 'ID must be an integer' });
  // }
  
  try {
    const { id } = req.params;
    const { name, completed } = req.body;
    let result = null;
    if (name && (completed === true || completed === false )){ // update both name and completed status
      const updateTodoQuery = `UPDATE todos SET name = $1, completed = $2 WHERE id = $3 RETURNING *;`;
      result = await pool.query(updateTodoQuery, [name, completed, id]);
    } else if (completed === true || completed === false ){ // just change completed status
      const updateTodoQuery = `UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *;`;
      result = await pool.query(updateTodoQuery, [completed, id]);
    } else { // just update name
      const updateTodoQuery = `UPDATE todos SET name = $1 WHERE id = $2 RETURNING *;`;
      result = await pool.query(updateTodoQuery, [name, id]);
    }
    

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo not found.' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Task with the specified id in the request
exports.delete = async (req, res) => {
  console.log("Deleting task...");
  try {
    const { id } = req.params;
    console.log("Attempting to delete task ID", id);
    const deleteTodoQuery = 'DELETE FROM todos WHERE id = $1 RETURNING *;';
    const result = await pool.query(deleteTodoQuery, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo not found.' });
    // } else if (!Number.isInteger(id)){
    //   res.status(500).json({ error: 'ID must be an integer' });
    }else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error){
    res.status(400).json({ error: error.message });
  }
};