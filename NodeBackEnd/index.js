const express = require("express");
const weatherRouter = require("./weatherRouter");
// create a server
const app = express();
app.use(express.json());
app.use("/api", weatherRouter);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
