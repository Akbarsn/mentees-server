const log = require("./infra/log/winston")

module.exports = {
  Serve: () => {
    const express = require("express");
    const cors = require("cors");
    const {handleErrors, handleNotFound} = require("./middleware/error_handler")
    const appEnv = require("./infra/env/env_driver").GetAppEnv()

    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.options('*', cors())
    app.use(cors())

    app.use(require("./route"))

    app.use(handleErrors)
    app.use(handleNotFound)

    require('./chat').InitChat(app)

    app.listen(appEnv.Port, () => {
      log.info(`[App] Running at :${appEnv.Port}`)
    });
  },
};
