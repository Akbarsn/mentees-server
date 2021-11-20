module.exports = (sequelize, type) => {
  const user = sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: type.STRING,
      unique: true,
    },
    email: {
      type: type.STRING,
      unique: true,
    },
    first_name: type.STRING,
    last_name: type.STRING,
    password: type.STRING,
    gender: type.STRING,
    birth_date: type.DATE,
    nationality: type.STRING,
    current_study: type.STRING,
    university: type.STRING,
    major: {
      type: type.STRING,
      allowNull: false,
    },
    interest: {
      type: type.STRING,
      allowNull: true,
    },
    achievement: {
      type: type.STRING,
      allowNull: true,
    },
    skill: {
      type: type.STRING,
      allowNull: true,
    },
    role: type.STRING,
  });

  user.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  
  return user;
};
