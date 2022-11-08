const gpiop_trigger = require("rpi-gpio").promise;
const gpiop_echo = require("rpi-gpio").promise;

var start;
var end;

const gpioFetch = (WaterUsage, Temperature, userID) => {
  setInterval(() => {
    console.log("We are collecting data from the sensors");

    gpiop_trigger
      .setup(23, gpiop_trigger.DIR_OUT)
      .then(async () => {
        return await gpiop_trigger.write(23, true);
      })
      .then(async () => {
        return await gpiop_trigger.write(23, false);
      })
      .catch((err) => console.error(err));

    // 시간 측정
    gpiop_echo.setup(24, gpiop_echo.DIR_IN).then(async () => {
      return await gpiop_echo.read(24, (err, value) => {
        if (err) {
          throw err;
        }

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
  }, 5000);
};

module.exports = gpioFetch;

/* 
gpio_trigger는 out (소프트웨어에서 하드웨어로 나간다. 센서로 데이터를 보냄)
gpio_echo는 in (하드웨어에서 소프트웨어로 들어온다. 센서에서 데이터를 읽어들임)

out으로 설정된 gpio_trigger를 1로 (센서 작동하라는 신호?)

잠시 기다리고

out으로 설정된 gpio_trigger를 0으로
*/
