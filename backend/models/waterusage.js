const Sequelize = require("sequelize");

module.export = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
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
    db.WaterUsage.belongsTo(db.User, { foreignKey: "", targetKey: "id" });
  }
};
