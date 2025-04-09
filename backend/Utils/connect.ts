import mongoose from "mongoose";
import config from "config";
import log from "../Utils/logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    log.info("Connected to DB");
  } catch (e) {
    log.error("Could not connect to DB", e);
    process.exit(1);
  }
}

export default connect;
