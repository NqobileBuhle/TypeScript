import express from "express";
import config from "config";
import routes from "./routes/routes";
import connect from "./Utils/connect";
import log from "./Utils/logger";
import deserializeUser from "./middleware/deserializeUser";

const app = express();
const port = config.get<number>("port");

app.use(express.json());
app.use(deserializeUser);



app.listen(port, async () => {
  log.info(`App is running on http://localhost:${port}`);
  await connect();
  routes(app);
});
