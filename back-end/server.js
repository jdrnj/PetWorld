const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const RegisterRouter = require("./Routes/register");
const LoginRouter = require("./Routes/login");
const CategoryRouter = require("./Routes/category");
const imageUploadRouter = require("./Routes/imageUpload");
const PetRouter = require("./Routes/Pet");
const adoptionRouter = require("./Routes/adoption");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/images", express.static(__dirname + "/images"));
app.use("/upload", imageUploadRouter);
app.use("/pet", PetRouter);
app.use("/register", RegisterRouter);
app.use("/login", LoginRouter);
app.use("/categories", CategoryRouter);
app.use("/adoption", adoptionRouter);
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("listening on..." + port);
});
