import mongoose from "mongoose";

const resultSchema=new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    required:true,
  },
quizId:
    {
     type:mongoose.Types.ObjectId,
     required:true 
  },
 score:{
  type:Number,
  required:true
},
total:{
    type:Number,
  required:true
}
},{timestamps:true})

const Result =mongoose.model("result",resultSchema)
export default Result