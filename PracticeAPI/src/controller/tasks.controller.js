let task = [
  { id: 2, description: "task2", done: false },
  { id: 1, description: "task1", done: false },
  { id: 3, description: "task3", done: false },
];
let id = 4;
const getAllTasks = (req, res) => {
  const { description } = req.query;

  if (description) {
    const findTask = task.filter((item) =>
      item.description.includes(description)
    );
    return res.json(findTask);
  }
  return res.json(task);
};

const getTaskById = (req, res) => {
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
  return res.json(foundData);
};

const updateTaskById = (req, res) => {
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

  if (description !== undefined) {
    foundData.description = description;
  }
  if (done !== undefined) {
    foundData.done = done;
  }
  return res.json(foundData);
};

const createTask = (req, res) => {
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
};

const deleteTaskById = (req, res) => {
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
};

module.exports = {
  getAllTasks,
  getTaskById,
  updateTaskById,
  createTask,
  deleteTaskById,
};
