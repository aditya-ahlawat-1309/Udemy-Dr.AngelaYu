const express = require("express");
const bodyParser =  require("body-parser");

const app = express();

app.set("view engine","ejs");

app.get("/", function(req,res){
    var today = new Date();
var currentDay  = today.getDay();

var day = "";

    // if(currentDay === 6 || currentDay === 0)
    // {
    //     day = "Weekend";
    // } else{
    //     day = "Weekday";
    // }

    // OR //

    switch(currentDay) {
        case 0:
            day = "Sunday";
            break;
            case 1:
                day = "Monday";
                break;
                case 2:
                    day = "Tuesday";
                    break;
                    case 3:
                        day = "Wednesday";
                        break;
                        case 4:
                            day = "Thrusday";
                            break;
                            case 5:
                                day = "Friday";
                                break;
                                case 6:
                                    day = "Saturday";
                                    break;
    }

    res.render("list", { kindOfDay: day });
    
});

app.listen(8000, function(){
    console.log("Server started on PORT 8000");
})