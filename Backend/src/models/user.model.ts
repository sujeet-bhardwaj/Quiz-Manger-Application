import mongoose  from "mongoose";

const UserSchema=new mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  mobile:{
    type:Number,
    required:false
  },
  password:{
      type:String,
      required:true
  },
  profilepic:{
    type:String,
    required:false,
    default:"/images/default.png"
  } 
},{timestamps:true})
const User=mongoose.model("workshop",UserSchema)
export default User