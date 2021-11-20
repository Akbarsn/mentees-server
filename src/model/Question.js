module.exports = (sequelize, type) => {
  return sequelize.define("question", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: type.STRING,
    content: type.STRING,
    status: type.STRING,
  });
};
