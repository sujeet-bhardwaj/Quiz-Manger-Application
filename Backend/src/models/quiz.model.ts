import mongoose  from "mongoose";

const QuizSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
question_list:[
    {
     question_number:Number,
     question:String,
  options: {
  a: String,
  b: String,
  c: String,
  d: String
}    
  }
],
 answer:{},
 created_by:{
     type:mongoose.Types.ObjectId,
          ref: "workshop", // <-- reference User model
      required: true,
  },
 ispublished:{
    type:Boolean,
    default:false
}
},{timestamps:true})

const Quiz=mongoose.model("quiz",QuizSchema)
export default Quiz