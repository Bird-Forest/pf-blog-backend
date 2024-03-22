const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const itemsRouter = require("./routes/api/items");
const userRouter = require("./routes/api/users");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/items", itemsRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found, app" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log("END APP", message);
  console.log("END APP", err);
  res.status(status).json({ message });
});

// app.listen(4000, () => {
//   console.log("Example app listening on port 4000!");
// });

module.exports = app;
