module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: type.STRING,
    email: type.STRING,
    first_name: type.STRING,
    last_name: type.STRING,
    password: type.STRING,
    gender: type.STRING,
    birth_date: type.DATE,
    nationality: type.STRING,
    current_study: type.STRING,
    interest: {
      type: type.STRING,
      allowNull: true,
    },
    achievement: {
      type: type.STRING,
      allowNull: true,
    },
    job: {
      type: type.STRING,
      allowNull: true,
    },
    role: type.STRING,
  });
};
