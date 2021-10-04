const express = require('express');
const app = express()
const mongoose =  require('mongoose')
var validator = require('validator');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true, useUnifiedTopology: true
})


//Create DB with name Users
const user =  mongoose.model('Users',{
    name:{type:String , required:true, trim :true},
    age:{type :Number, default:0, validate(value){
      if(value<0){
       throw new Error("Negitive age is not allowed")
      }
    }},
    Email:{type:String, validate(value){

        if(!validator.isEmail(value)){

            throw new Error("Email is not valid formate")

        }

    }},
    password:{type:String,required:true,trim:true,minLength:7}


})



// Create Insitance of DB

const me = new user( 
    {
        name:'sohan',
        age:30,
        Email:'Lucky@gmail.com',
        password:'Lucky1213'

})

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
  console.log("Error", error);
})




app.get('/', async(req, res)=>{

    try{
        const userDetails = await UserDetails.find({})
        console.log(userDetails)
        res.send(userDetails)
      }
      catch(e){
      }
 

})



const port =  process.env.PORT || 3000

app.listen(port,()=>{
 console.log(`${port} is listning`)
})
