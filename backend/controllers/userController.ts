import { Request, Response } from "express";
import { createUser } from "../services/userServices";
import { CreateUserInput } from "../schema/userSchema";
import log from "../Utils/logger";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    // Call the createUser function from the service and get the user
    const user = await createUser(req.body);

    // Ensure the user object is valid before sending it in the response
    if (!user) {
      log.error("User creation failed, user object is undefined.");
      return res.status(500).send("User creation failed.");
    }

    // Return the user without the password field
    return res.status(201).send(omit(user, "password"));
  } catch (e: any) {
    // Log the error for debugging purposes
    log.error("Error during user creation:", e);

    // Return an error response
    return res.status(409).send(e.message || "Error creating user");
  }
}
