import mongoose from 'mongoose';
import bcryt from 'bcrypt';
import config from 'config';


export interface userDocument extends mongoose.Document{
    email:string;
    username:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
}

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    password:{type:String,required:true}

},{
    timestamps:true
}
);
const User=mongoose.model("User",userSchema)

export default User;
