const express = require("express");
const app = express();
const path = require("path");
const { sequelize } = require("./models");
const rootRouter = require("./routers/IndexRouter");

// JSON PARSE
app.use(express.json());

// ROUTER
app.use("/api/v1", rootRouter);

// Setup Static File
const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Run at http://localhost:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
