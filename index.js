const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const utils = require("./util");

global.utils = utils;

const chatRoute = require("./routes/chat");
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client")));

app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
