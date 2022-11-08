const Sequelize = require("sequelize");

class Temperature extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user: {
          type: Sequelize.INTEGER.UNSIGNED, //양의 정수
          antoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        temperature: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Temperature",
        tableName: "Temperature",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Temperature.belongsTo(db.User, { foreignKey: "user", targetKey: "id" });
  }
}

module.exports = Temperature;
