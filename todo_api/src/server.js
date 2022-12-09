const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// const Pool = require("pg").Pool
const app = express();
const cors = require('cors');
const db = require("./config/database");
const TaskModel = require("./models/task");

const PORT = process.env.PORT || 3001;
const PGHOST = process.env.POSTGRES_HOST || '127.0.0.1';
const PGPORT = process.env.POSTGRES_PORT || 5432;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
// app.options('*', cors());
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// Controller containing the CRUD methods
const tasksController = require('./tasksController');


app.get("/", function (req, res, next){
  // res.send(`Welcome to Todo API`); 
  res.status(200).json({ message: "Welcome to Tasks api" });
});

app.get("/api/tasks", tasksController.findAll);

app.post("/api/tasks", tasksController.create);

app.put("/api/tasks/:id", tasksController.update);

app.delete("/api/tasks/:id", tasksController.delete);


const initApp = async () => {
  console.log("Testing the database connection..");
  /**
   * Test the database connection to Sequelize.
   */
  try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
    
       // add hoc means of updating the database schema and inserting seed datra if the table if empty
       // this would usually be handled by migrations and seeders 
       db.sync({alter: true})
          .then(() => {
              console.log("Database and tables created");
              if (TaskModel.findOne() == null){
                console.log("Seeding empty Tasks table...");
                TaskModel.bulkCreate([{
                    name: 'Eat',
                    completed: true,
                  },
                  {
                   name: "Sleep",
                   completed: false,
                  },
                  {
                   name: "Repeat",
                   completed: false,
                  }
                 ], {});
              } else {
                console.log("Tasks table already had entries, no seeding applied");
              }
              
          })
          .catch((err) => {
              console.log("Failed to sync db: " + err.message);
          });
      
          
          
      // Syncronize the Task model.
      TaskModel.sync({
          alter: true,
      })
      .then(() => {
          console.log("Synced tasks table");
      })
      .catch((err) => {
          console.log("Failed to sync db table: " + err.message);
      });     
  

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
