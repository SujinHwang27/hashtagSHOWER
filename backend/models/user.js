const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED, //양의 정수
          antoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        goal: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "User",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.WaterUsage), db.User.hasMany(db.Temperature);
  }
}

module.exports = User;
