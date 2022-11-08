const Sequelize = require("sequelize");
const Temperature = require("./temperature");
const WaterUsage = require("./waterusage");
const User = require("./user");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
// db를 객체로 생성
const db = {};

// sequelize 객체가 config 파일 참조하도록 설정 (db 연결)
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Temperature = Temperature;
db.WaterUsage = WaterUsage;
db.User = User;

Temperature.init(sequelize);
WaterUsage.init(sequelize);
User.init(sequelize);

Temperature.associate(db);
User.associate(db);
WaterUsage.associate(db);

module.exports = db;
