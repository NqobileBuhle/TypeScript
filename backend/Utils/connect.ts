import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    log.info(" Database successfully connected");
  } catch (error) {
    log.error(" Failed to connect to database", error); 
    process.exit(1);
  }
}

export default connect;
