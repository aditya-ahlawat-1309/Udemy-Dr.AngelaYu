const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", (req,res) => {
 res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const Email = req.body.Email;

    const data=  {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

const url = "https://us4.api.mailchimp.com/3.0/lists/4bcf3cbb34";

const options = {
  method: "POST",
  auth: "angela1:fd8d2a94f77b14c7c113e1d4a29c6120-us4",
};

  const request =  https.request(url, options, (response) => {

    if(response.statusCode === 200)
    {
       // res.send("Success");
       res.sendFile(__dirname+"/success.html");
    }
    else
    {
    // res.send("Failure");
    res.sendFile(__dirname+"/failure.html");
    }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

console.log(firstName,lastName,Email);
})

app.listen(8000, function(){
    console.log("app is running on PORT 8000");
})

//API Key
// 656e7c40c0fae6b2735dbd7fbac1b18c-us13