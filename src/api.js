module.exports = {
  Serve: () => {
    const express = require("express");
    const cors = require("cors");
    const envDriver = require("./infra/env/env_driver");
    const log = require("./infra/log/winston")

    const app = express();

    app.use(express.json());
    app.use(cors());

    const dbEnv = envDriver.GetDBEnv();
    const appEnv = envDriver.GetAppEnv();

    const {} = require('./model')

    app.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    app.listen(appEnv.Port, () => {
      log.info(`[App] Running at :${appEnv.Port}`)
    });
  },
};
