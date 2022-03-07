const express = require("express");
const app = express();

const https = require("https")

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
 var firstName = req.body.fname;
 var lastName = req.body.sname;
 var email = req.body.mail;

 

 const data ={
     members: [
         {
             email_address: email,
             status: "subscribed",
             merge_fields:{
                 FNAME:firstName,
                 LNAME:lastName
             }
         }
     ]
 };

 const jsonData = JSON.stringify(data)

 const url = "https://us6.api.mailchimp.com/3.0/lists/13d5c4f34d";

 const options = {
     method:"POST",
     auth:KEY
     
 }
 const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));

    });
});
    request.end();
 });
 


 app.post("/failure",function(req, res){
     res.redirect("/");
 })

app.listen(process.env.PORT || 3000,function(){
    console.log("newsletter server starting on port 3000")
})


// API keys
// cfba14903298570d82c34e66000de7fc-us6

// audience id
//13d5c4f34d