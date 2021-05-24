const express = require("express");
const app = express();
const RegisterRouter = require("./Routes/register");
const LoginRouter = require("./Routes/login");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/register", RegisterRouter);
app.use("/login", LoginRouter);
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("listening on..." + port);
});
