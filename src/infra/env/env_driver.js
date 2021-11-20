require("dotenv").config();

const GetDBEnv = () => {
  return {
    Dialect: process.env.DBDialect,
    Username: process.env.DBUsername,
    Password: process.env.DBPassword,
    Name: process.env.DBName,
    Host: process.env.DBHost,
    Port: process.env.DBPort,
  };
};

const GetAppEnv = () => {
  return {
    Mode: process.env.Mode,
    Port: process.env.Port,
  };
};

module.exports = {
  GetAppEnv,
  GetDBEnv,
};
