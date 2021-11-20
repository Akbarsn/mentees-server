module.exports = (sequelize, type) => {
    return sequelize.define("chat_history", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: type.INTEGER,
    });
  };
  