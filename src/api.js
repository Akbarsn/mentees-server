module.exports = {
  Serve: () => {
    const express = require("express");
    const cors = require("cors");
    const envDriver = require("./infra/env/env_driver");

    const app = express();

    app.use(express.json());
    app.use(cors());

    const dbEnv = envDriver.GetDBEnv();
    const appEnv = envDriver.GetAppEnv();

    

    app.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    app.listen(appEnv.Port, () => {
      console.log(`Listening to port :${8080}`);
    });
  },
};
