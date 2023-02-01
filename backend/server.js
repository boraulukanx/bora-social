const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

mongoose.set("strictQuery", true);

const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    console.log(req.body.image);
    console.log(req.file.path);
    // Update the user's profile picture
    const user = await User.findByIdAndUpdate(req.body.userId, {
      profilePicture: {
        data: req.file.path,
        contentType: "image/png",
      },
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

app.listen(port, () => console.log("server is up and running on port " + port));
