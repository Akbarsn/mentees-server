const Sequelize = require("sequelize");
const log = require("../log/winston");
const envDriver = require("../env/env_driver");

const InitDB = () => {
  const env = envDriver.GetDBEnv();
  const sequelize = new Sequelize(env.Name, env.Username, env.Password, {
    host: env.Host,
    port: env.Port,
    dialect: env.Dialect,
  });

  try {
    await sequelize.authenticate();
    log.info("[DB] DB Connected");
  } catch (error) {
    log.error("[DB] Failed to authenticate");
  }

  return sequelize;
};

module.exports = {
  InitDB,
};
