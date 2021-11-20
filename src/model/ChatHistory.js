module.exports = (sequelize, type) => {
    return sequelize.define("chat_history", {
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
  