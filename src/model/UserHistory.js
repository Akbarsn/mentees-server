module.exports = (sequelize, type) => {
    return sequelize.define("user_history", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: type.STRING,
    });
  };
  