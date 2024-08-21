const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
let task = [];
let id = 0;
app.get("/tasks", (req, res) => {
  if (task.length === 0) {
    return res.send("No task");
  }
  return res.send(task);
});
app.get("/tasks/:id", (req, res) => {
  const findID = req.params.id;
  console.log(findID);
  const foundData = task.filter((item) => {
    console.log(item.id == findID);
    return item.id == findID;
  });
  return res.send(foundData);
});
app.put("/tasks/:id", (req, res) => {
  const findID = req.params.id;
  const updateData = req.body;
  const foundDataIndex = task.findIndex((item) => {
    return item.id == findID;
  });
  task[foundDataIndex].description = updateData.description;
  task[foundDataIndex].done = updateData.done;
  return res.send(task[foundDataIndex]);
});
app.post("/tasks", (req, res) => {
  id++;
  const addData = req.body.description;
  console.log(addData);
  const newData = {
    id: id,
    description: addData,
    done: false,
  };
  task.push(newData);
  return res.send(task);
});
app.delete("/tasks/:id", (req, res) => {
  const findID = req.params.id;
  const findDataIndex = task.findIndex((item) => {
    return item.id == findID;
  });
  const deletedTask = task.splice(findDataIndex, 1);
  return res.send(deletedTask);
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});
