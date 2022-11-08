const gpiop_trigger = require("rpi-gpio").promise;
const gpiop_echo = require("rpi-gpio").promise;

var start;
var end;

const gpioFetch = (WaterUsage, Temperature, userID) => {
  while (true) {
    console.log("We are collecting data from sensor");

    gpiop_trigger
      .setup(23, gpiop_trigger.DIR_OUT)
      .then(async () => {
        return await gpiop_trigger.write(23, true);
      })
      .then(async () => {
        return await gpiop_trigger.write(23, false);
      });

    // 시간 측정
    gpiop_echo.setup(24, gpiop_echo.DIR_IN).then(async () => {
      return await gpiop_echo.read(24, (err, value) => {
        // value는 pin value를 true false로 읽어들임
        while (!value) {
          start = new Date(); //시작
        }
        while (value) {
          end = new Date(); //종료
        }
      });
    });

    var timeElapsed = end - start;

    var distance = Math.round(((timeElapsed * 34300) / 2) * 100) / 100;

    try {
      WaterUsage.create({
        user: userID,
        waterusage: distance,
      });
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = gpioFetch;
