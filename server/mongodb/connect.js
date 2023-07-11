import mongoose from "mongoose";

const connectDB=(url)=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('connected MongoDB'))
    .then((err)=>{console.log(err)})
}

export default connectDB;
