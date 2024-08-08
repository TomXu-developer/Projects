const express = require("express");
const weatherRouter = express.Router();

let data = [
  {
    activity: ["morning jog", "breakfast", "work", "lunch", "gym"],
    weather: "sunny",
  },
  {
    activity: ["work", "coffee break", "meetings", "dinner", "movie"],
    weather: "cloudy",
  },
  {
    activity: ["weekend", "hiking", "picnic", "reading", "gardening"],
    weather: "rainy",
  },
];
//GET entire List
weatherRouter.get("/list", (req, res) => {
  res.send(data);
});
//GET an activity by query
weatherRouter.get("/activities", (req, res) => {
  const activityFind = req.query.activity;
  if (!activityFind) {
    return res.status(400).send("Not Found");
  }
  const foundItems = data.filter((item) => {
    return item.activity.includes(activityFind);
  });
  if (!foundItems.length) {
    return res.status(404).send("Activity not found");
  }
  res.send(foundItems);
});
//POST
weatherRouter.post("/activities", (req, res) => {
  const { activity, weather } = req.body;
  if (!activity || !weather) {
    return res.status(400).send("activity and weather are required");
  }
  const newActivity = { activity, weather };
  data.push(newActivity);
  res.status(201).send({
    msg: "add activity succeeded",
  });
});
//GET activities based on weather cosition
weatherRouter.get("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  const itemWithCondition = data.filter((item) => {
    return item.weather === weatherCondition;
  });
  res.send(itemWithCondition);
});
//PUT update activities
weatherRouter.put("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  const newActivity = req.body.activity;
  const findIndex = data.findIndex((item) => {
    return item.weather === weatherCondition;
  });
  if (findIndex === -1) {
    return res.status(404).send("not Found weather");
  }
  data[findIndex].activity = newActivity;
  res.status(200).send({
    msg: "updated",
    updatedActivity: data[findIndex],
  });
});
//DELETE items based on weather condition
weatherRouter.delete("/activities/weather/:condition", (req, res) => {
  const weatherCondition = req.params.condition;
  const deletedItemIndex = data.findIndex((item) => {
    return item.weather === weatherCondition;
  });
  const deletedItem = data.splice(deletedItemIndex, 1);
  res.status(200).send({
    msg: "deleted",
    deleted: deletedItem[0],
  });
});
module.exports = weatherRouter;
