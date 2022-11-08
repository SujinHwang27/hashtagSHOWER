var userID = 0;

const gpioFetch = require("./gpio/gpio");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config();

const { sequelize, User, WaterUsage, Temperature } = require("./models");

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
    //실시간 센싱 데이터 저장
    gpioFetch(WaterUsage, Temperature, userID);
  })
  .catch((err) => {
    console.error(err);
  });

// 1초마다 요청이 오면 1초마다 관측한 monitoring 데이터 전송
app.get("/monitor", async (req, res, next) => {
  console.log(":5001/monitor get 요청 받음");
  try {
    var waterUsage = WaterUsage.findAll({
      attributes: ["user", "waterusage"],
      where: {
        user: 1,
      },
      raw: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
  res.send(waterUsage);
  //res.send({ user: 1, waterusage: 120 });
});

// 사용자 물 사용 통계량 데이터 제공, 서버 측에서 데이터 보내주면 클라이언트는 해당 데이터 rendering
// 사용자 1로 고정
app.get("/statsWaterUsage", async (req, res, next) => {
  console.log(":5001/stats 물 사용량 get 요청 받음");
  try {
    var waterUsage = await WaterUsage.findAll({
      attributes: ["user", "waterusage"],
      where: {
        user: 1,
      },
      raw: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
  res.send(waterUsage);
  // res.send([
  //   { user: 1, waterusage: 120 },
  //   { user: 1, waterusage: 80 },
  //   { user: 1, waterusage: 100 },
  // ]);
});

app.get("/statsTemperature", async (req, res, next) => {
  console.log(":5001/stats 온도 get 요청 받음");
  try {
    const temperature = await Temperature.findAll({
      attributes: ["user", "temperature"],
      where: {
        user: 1,
      },
      raw: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
  res.send([
    { user: 1, temperature: 30 },
    { user: 1, temperature: 35 },
    { user: 1, temperature: 25 },
  ]);
});

// goal db에 저장 (goal set 할 때마다 새로운 user, 새로운 goal tuple 생성)
app.post("/goalset", async (req, res, next) => {
  const { goal } = await req.body;
  try {
    await User.create({
      id: userID,
      goal,
    });
    userID = userID + 1;
  } catch (err) {
    console.error(err);
    next(err);
  }
  res.send(goal);
});

// 오류 처리: 요청 경로가 없을 경우
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 서버 오류 처리
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
});

// port 5001에서 서버 실행
app.listen(app.get("port"), () => {
  console.log("Server is running on port", app.get("port"));
});
