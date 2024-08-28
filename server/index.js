const express = require("express");
const app = express();
const db = require("./db");
app.use(express.json());
const cors = require("cors");
const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");
app.use(cors());
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3001, () => {
  console.log("server listening on 3001");
});
