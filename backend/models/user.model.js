module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" }
  });
};