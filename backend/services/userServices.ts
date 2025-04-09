import User, { UserDocument } from "../models/userModel";

export async function createUser(input: Partial<UserDocument>) {
  return await User.create(input);
}
