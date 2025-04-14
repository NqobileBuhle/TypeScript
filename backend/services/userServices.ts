import User, { UserDocument } from "../models/userModel";
import { omit } from "lodash";
import {DocumentDefinition} from "mongoose";


export async function createUser(input: DocumentDefinition<Omit<UserDocument,"createdAt"|"updatedAt"|"comparePassword">
    >

){
    try{
        const user=await User.create(input);
  return omit (user.toJSON(),'password')
    }catch(e:any){

    }
}

// Validate password for login
export async function validatePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserDocument | false> {
    const user = await User.findOne({ email });
  
    if (!user) return false;
  
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;
  
    return user; // ✅ Return full Mongoose doc, not plain object
  }
  

