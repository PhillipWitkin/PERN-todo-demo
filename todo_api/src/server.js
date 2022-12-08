const express = require('express');
const bodyParser = require('body-parser');
// const Pool = require("pg").Pool
const app = express();
const cors = require('cors');
const db = require("./config/database");
const TaskModel = require("./models/task");

const PORT = process.env.PORT || 3001;
const PGHOST = process.env.POSTGRES_HOST || '127.0.0.1';
const PGPORT = process.env.POSTGRES_PORT || 5432;


// Controller containing the CRUD methods
const tasksController = require('./tasksController');


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


// db.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

app.get("/", function (req, res){
  // res.send(`Welcome to Todo API`); 
  res.status(200).json({ message: "Welcome to Tasks api" });
});

const initApp = async () => {
  console.log("Testing the database connection..");
  /**
   * Test the connection.
   * You can use the .authenticate() function to test if the connection works.
   */

  try {
      await db.authenticate();
      console.log("Connection has been established successfully.");

    //  db.sync()
    //       .then(() => {
    //           console.log("Synced db.");
    //       })
    //       .catch((err) => {
    //           console.log("Failed to sync db: " + err.message);
    //       });
          
      /**
       * Syncronize the Task model.
       */
      TaskModel.sync({
          alter: true,
      })
      .then(() => {
          console.log("Synced tasks table");
      })
      .catch((err) => {
          console.log("Failed to sync db table: " + err.message);
      });
  
      /**
       * Start the web server on the specified port.
       */
      app.listen(PORT, () => {
          console.log(`Server is up and running at: http://localhost:${PORT} and connecting to postgres on ${PGHOST} port ${PGPORT}`);
      });

  } catch (error) {
      console.error("Unable to connect to the database:", error.original);
  }
};

/**
* Initialize the application.
*/
initApp();
