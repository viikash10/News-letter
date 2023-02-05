const express = require("express") ; 
const bodyParser = require("body-parser") ; 
const request = require("request") ; 
const https =   require("https") ; 
const { url } = require("inspector");
const { hostname } = require("os");


const app = express() ; 

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response)
{
    response.sendFile(__dirname+"/signup.html") ; 
});

app.post("/",function(request,response){
   const firstName = request.body.fname ;
   const lastName = request.body.lname ;
   const email = request.body.email ; 
   const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_field:{
                FNAME: firstName,
                LNAME: lastName
            }

        }
    ]
   };

   const jsonData = JSON.stringify(data) ; 
   const url = "https://us21.api.mailchimp.com/3.0/lists/e30980b2a8" ;
   const options = {
    method: "post",
    auth: "vikash10:0cd22ee93b522fde60c55c4010616ed7-us21"
   }
   const req = https.request(url , options, function(res){
         if(res.statusCode === 200)
         {
            response.sendFile(__dirname + "/success.html") ; 
         }
         else
         {
            response.sendFile(__dirname+"/failure.html") ; 
         }
         response.on("data",function(data){
                console.log(JSON.parse(data));
         });
   });
   req.write(jsonData);
   req.end() ; 
});

app.post("/failure",function(request,response){
    response.redirect("/") ; 
});

app.listen(3000,function(){
    console.log("server is running on port : 3000 ") ; 
});


//3000 , function()