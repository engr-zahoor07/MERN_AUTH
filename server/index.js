const expres = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connect_DB = require("./connect DB/Connect_DB");

const app = expres();

app.use(expres.json());

app.use(cors());

app.use(morgan("dev"));

app.use("/user", require("./route/userRoutes"));

app.listen(process.env.PORT, async () => {
  await connect_DB();
  console.log(`Server is running at port ${process.env.PORT}`);
});
