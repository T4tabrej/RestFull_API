const express = require("express");

require("./db/conn")
const Student=require("./models/students")
const app=express();
const port =process.env.PORT||3000;
// to recognise the any json format  it will print the data coming from postman in json format other it will show undefine value
app.use(express.json())






// it is using of promisses but we will use assync await function

/*



app.post("/students",(req,res)=>{
// res.send("hello from the other side");
// getting from the postman
console.log(req.body);
const user=new Student(req.body);
//for insert the data in compass db we have to write user.save() and the it will return a promise 

user.save()
.then(()=>{
    console.log("Data inserted at the database");
    // res.send(201,user)
    res.status(201).send(user)
   
}).catch((err)=>{
console.log(err);
// res.send(400,err)
res.status(400).send(err)
   

})



// res.send("Data got form the postman")


})*/



// using assync function to input the data

app.post("/students",async(req,res)=>{
    try {
        const UserInfo=new Student(req.body);
        // console.log(req.body);
        const craeteUser=await UserInfo.save();
        res.status(201).send(craeteUser);
        
    } catch (error) {
        res.status(400).send(error);
    }

})


//getiing the data from database 
app.get("/students",async(req,res)=>{

    try {
        const studentsData=await Student.find();
        res.status(201).send(studentsData)
    } catch (error) {
        res.status(400).send(error)
    }
   
    
})

//endig the getting data


// getting individusal data of student

app.get("/students/:name",async(req,res)=>{
try {
    const search_name=req.params.name;
    const studentData=await Student.findOne({ name:search_name})
    res.status(201).send(studentData)


} catch (e) {
    res.status(400).send(e)
    console.log(e);
    
}
})
//endig of getting individual data


app.listen(port,()=>{
    console.log(`listening at port no ${port}`);
});