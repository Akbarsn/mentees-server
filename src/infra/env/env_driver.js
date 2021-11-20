require("dotenv").config();

const GetDBEnv = () => {
  return {
    Dialect: process.env.DB_DIALECT,
    Username: process.env.DB_USERNAME,
    Password: process.env.DB_PASSWORD,
    Name: process.env.DB_NAME,
    Host: process.env.DB_HOST,
    Port: process.env.DB_PORT,
  };
};

const GetAppEnv = () => {
  return {
    Mode: process.env.MODE,
    Port: process.env.PORT,
  };
};

module.exports = {
  GetAppEnv,
  GetDBEnv,
};
