const Sequelize = require("sequelize");

class WaterUsage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user: {
          type: Sequelize.INTEGER.UNSIGNED, //양의 정수
          antoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        waterusage: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "WaterUsage",
        tableName: "WaterUsage",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.WaterUsage.belongsTo(db.User, { foreignKey: "user", targetKey: "id" });
  }
}

module.exports = WaterUsage;
