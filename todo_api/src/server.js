const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8082;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors()); 
// If we wanted to restrict the origin of HTTP requests:
// var corsOptions = {
//   origin: "http://localhost:3000"
// };
// app.use(cors(corsOptions));

// Controller containing the CRUD methods
const tasksController = require('./tasksController');


app.get("/", function (req, res, next){
  // res.send(`Welcome to Todo API`); 
  res.status(200).json({ message: "Welcome to Todos api" });
});

// API endpoints
app.get("/api/tasks", tasksController.findAll);

app.post("/api/tasks", tasksController.create);

app.put("/api/tasks/:id", tasksController.update);

app.delete("/api/tasks/:id", tasksController.delete);


app.listen(PORT, () => {
    console.log(`Server is up and running at: http://localhost:${PORT}`);
});

