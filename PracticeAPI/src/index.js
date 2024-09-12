const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routes);


app.listen(3000, () => {
  console.log("server is listening on 3000 port");
});
