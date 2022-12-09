const TaskModel = require("./models/task");
// const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*"); 
    // Validate request
  if (!req.body.name) {
    console.log(req);
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a new Todo task
  const task = {
    name: req.body.name,
    completed: req.body.completed || false
  };

  // Save Task
  TaskModel.create(task)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res, next) => {
  TaskModel.findAll()
    .then(data => {
        res.status(200).json(data);
      })
    .catch(err => {
        res.status(500).json({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });

};


// Update a Task by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const task = await TaskModel.findByPk(id);
    if (task != null){
        // console.log("Found ", task);
        task.set(req.body);
        await task.save();
        res.json(task);
    } else {
        res.send({
            message: `Cannot update Task with id=${id}.`
        });
    }

    // task.update(req.body, {
    //   where: { id: id },
    //   returning: true,
    //   plain: true
    // })
    //   .then(num => {
    //     if (num == 1) {
    //       res.json({
    //         task
    //       });
    //     } else {
    //       res.send({
    //         message: `Cannot update Task with id=${id}. Maybe Tutorial was not found or req.body is empty!`
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message: "Error updating Task with id=" + id
    //     });
    //   });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    TaskModel.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Task was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Task with id=" + id
          });
        });
};