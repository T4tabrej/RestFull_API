 //we are connecting with the database with the help of mongoose
 const mongoose=require("mongoose");
 mongoose.connect("mongodb://localhost:27017/student-api")
 .then(()=>{
console.log("connected");
 })
 .catch(()=>{
     console.log("Sorry!connetion Faild...");
 })