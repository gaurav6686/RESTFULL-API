const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
// const encoder = bodyparser.urlencoded();


const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "Gaurav@6686",
    database:"projects"
});

connection.connect(function(error){
    if(error) throw error
    else console.log("connect to the database succesfully");
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

try {
    app.post("/",function(req,res){
        var FIRST_NAME = req.body.fname;
        var LAST_NAME = req.body.lname;
        var EMAIL= req.body.email; 
        var MOBILE_NO = req.body.mobile;
        var ORGANIZATION_NAME = req.body.orgname;
        var ORGANIZATION_ADDRESS = req.body.orgadd;
        var USER_PASSWORD = req.body.pass;
        
        connection.query("INSERT INTO oracle SET ?", {FIRST_NAME,LAST_NAME,EMAIL,MOBILE_NO,ORGANIZATION_NAME,ORGANIZATION_ADDRESS,USER_PASSWORD}, function(error,result,fields){
            // if(results.length > 0){
            //     res.redirect("/welcome");
            // }else if(results.length < 0){
            //     res.send("hello world");
            // }
            // else{
            //     console.log(error);
            // }
            // res.end();
            if(error){
                console.log(error);
            }
            else{
                console.log("successs");
                
            }
            res.send("WELCOME");
            res.send(fields);
         })
    });
    
} catch (error) {
    console.log(error);
}

app.listen(3000);