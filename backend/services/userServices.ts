import User, { UserDocument } from '../models/userModel';

type CreateUserInput = Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>;

export async function createUser(input: CreateUserInput) {
  try {
    return await User.create(input);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
