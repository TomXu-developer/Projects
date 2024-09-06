const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
let task = [
  { id: 2, description: "task2", done: false },
  { id: 1, description: "task1", done: false },
  { id: 3, description: "task3", done: false },
];
let id = 4;
app.get("/tasks", (req, res) => {
  const {description} = req.query;

  if (description) {
    const findTask = task.filter((item)=>item.description.includes(description));
    return res.json(findTask);
  }
  return res.json(task);
});
app.get("/tasks/:id", (req, res) => {
  const findID = Number(req.params.id);
  // const foundData = task.filter((item) => {
  //   return item.id === findID;
  // }); filter function will iterate the array, but for finding the item by ID, it can use find function

  const foundData = task.find((item) => item.id === findID);
  if (!foundData) {
    res.status(404).json({
      statusCode: 404,
      error: "not found",
      msg: "task not found",
    });
    return;
  }
  return res.json(foundData);
});
app.put("/tasks/:id", (req, res) => {
  const findID = Number(req.params.id);
  const foundData = task.find((item) => item.id === findID);
  if (!foundData) {
    res.status(404).json({
      statusCode: 404,
      error: "not found",
      msg: "task not found",
    });
    return;
  }
  const { description, done } = req.body;
  // const foundDataIndex = task.findIndex((item) => {
  //   return item.id === findID;
  // });
  // task[foundDataIndex].description = updateData.description;
  // task[foundDataIndex].done = updateData.done;
  if (description !== undefined) {
    foundData.description = description;
  }
  if (done !== undefined) {
    foundData.done = done;
  }
  return res.json(foundData);
});
app.post("/tasks", (req, res) => {
  const { description } = req.body;
  if (description === undefined) {
    return res.status(404).json({
      msg: "bad request",
    });
  }
  const newData = {
    id: id++,
    description: description,
    done: false,
  };
  task.push(newData);
  return res.status(201).json(task);
});
app.delete("/tasks/:id", (req, res) => {
  const findID = Number(req.params.id);
  const findDataIndex = task.findIndex((item) => {
    return item.id === findID;
  });
  if (findDataIndex === -1) {
    res.status(404).json({
      msg: "not found the task",
    });
    return;
  }
  const [deletedTask] = task.splice(findDataIndex, 1);
  return res.status(204).json(deletedTask);
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});
