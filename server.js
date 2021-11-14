const express = require("express");
const cors = require("cors");
const fs  = require("fs");
const multer  = require("multer");
const upload = multer({ dest: 'uploads/' });
const app = express();

/** Middlewares */

app.use(express.urlencoded({ extended: false })); // request parser mw
app.use(cors({ optionsSuccessStatus: 200 })); // cors mw
app.use(express.static("public")); // assets mw

/** Basic routes **/

app.route("/").get((req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.route("/api/hello").get((req, res) => {
  res.json({ greeting: "hello API" });
});

/** Exercise routes */

app.route("/api/fileanalyse")
    .post(upload.single('upfile'), async (req, res, next) => {

  if (!req.file || Object.keys(req.file).length === 0) {
    res.status(400).json({error: "No files uploaded"});
    return next();
  }

  const upfile = req.file;
  console.log(upfile);

  try {
   
    // Response data

     res.json({
      name: upfile.originalname,
      type: upfile.mimetype,
      size: upfile.size,
    });

    // Delete file

    await fs.unlink(req.file.path, (err) => {
      if (err) console.error("unlink failed", err);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
