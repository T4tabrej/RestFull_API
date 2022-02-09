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
    
   
        
        if (studentData!=null) {
            res.status(201).send(studentData)
        } else {
             res.status(500).send("Data not Found At Server");
        }
  
       
 
   


} catch (e) {
    res.status(500).send(e)
    console.log(e);
    
}
})
//endig of getting individual data

//updating the data using patch
app.patch("/students/:id",async(req,res)=>{
try {
   const _id=req.params.id; 
   const updatedData=await Student.findByIdAndUpdate(_id, req.body,{
       new:true//it will reflect the updated value
   })
   res.status(200).send(updatedData)           
} catch (e) {
    res.status(404).send("Data not Found")
    
}
})
//for deleting the data
app.delete("/students/:id",async (req,res)=>{
    //getting the id from url
    
    try {
        const id=req.params.id;
        if (!id) {
         res.status(400).send("Data is Not Found")
        }
        const delteData=await Student.findByIdAndDelete(id);
        res.status(200).send(delteData)
            
        
    }
     catch (e) {
        res.status(404).send("Data not Found")   
    }
})
app.listen(port,()=>{
    console.log(`listening at port no ${port}`);
});


//this is complete rest api code from postman 