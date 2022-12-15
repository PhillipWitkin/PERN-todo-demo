const TaskModel = require("./models/task");

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
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*"); 
  TaskModel.findAll()
    .then(data => {
        return res.status(200).json(data);
      })
    .catch(err => {
        return res.status(500).json({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });

};


// Update a Task by the id in the request
exports.update = async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*"); 
    const id = req.params.id;
    const task = await TaskModel.findByPk(id);
    if (task != null){
        // console.log("Found ", task);
        task.set(req.body);
        await task.save();
        return res.json(task);
    } else {
        return res.send({
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
    res.set("Access-Control-Allow-Origin", "*"); 
    const id = req.params.id;
    TaskModel.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            return res.send({
              message: "Task was deleted successfully!"
            });
          } else {
            return res.send({
              message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
            });
          }
        })
        .catch(err => {
          return res.status(500).send({
            message: "Could not delete Task with id=" + id
          });
        });
};