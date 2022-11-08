const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config();

const { sequelize } = require("./models");

const app = express();
// const router = express.Router(); -> 필요하면 사용하기

// json 요청 파싱
app.use(bodyParser.json());
app.use(cors());
app.set("port", process.env.PORT || 5000);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Success to connect on database");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/text", (req, res) => {
  res.send("<h2>SHOWER 서버 실행<h2>");
});

app.post("/text", async (req, res) => {
  const { goal } = await req.body;
  console.log(goal);
  res.send(goal);
});

// port 3000에서 서버 실행
app.listen(app.get("port"), () => {
  console.log("Server is running on port", app.get("port"));
});
