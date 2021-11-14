const express = require("express");
const cors = require("cors");
const app = express();

/** Middlewares */

app.use(cors({ optionsSuccessStatus: 200 })); // cors mw
app.use(express.static("public")); // assets mw

/** Basic routes **/

app.route("/").get((req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.route("/api/hello").get((req, res) => {
  res.json({ greeting: "hello API" });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
