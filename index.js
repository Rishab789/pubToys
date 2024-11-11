const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.use(
  cors({
    origin: ["https://www.pubtoys.store", "http://localhost:3000"],
    // Allow only your frontend's origin
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

const Upload = require("./routes/imageUpload");
const postFile = require("./routes/postFile");

app.use("/api/v1", Upload);
app.use("/api/v1", postFile);

const connectWithDB = require("./config/database");
connectWithDB();

app.listen(PORT, (req, res) => {
  console.log("server is running on port 8000");
});

app.get("/", (req, res) => {
  res.send(`Server has started on port number  ${PORT}`);
});
