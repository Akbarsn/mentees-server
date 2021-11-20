module.exports = (sequelize, type) => {
    return sequelize.define("room", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      questioner: type.INTEGER,
      answerer: type.INTEGER,
      type: type.STRING,
    });
  };
  