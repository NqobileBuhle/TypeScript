import express from "express";
import config from "config";
import connect from "./Utils/connect";
import log from "./Utils/logger";
import routes from "./routes/routes";

const port = config.get<number>('port');

const app = express();


app.listen(port, async () => {
  log.info(`App is running on http://localhost:${port}`);

  try {
    await connect();
  } catch (err) {
    log.error(" Failed to connect to the database", err);
  }
  routes(app);
});
