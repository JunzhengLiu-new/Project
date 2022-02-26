const express = require("express");
const app = express()
const os = require("os");
const fs = require("fs");
app.use("/data",express.static("data"));
app.use(express.json());
module.exports = function(){
    return function(req,res,next){
        const query = req.body;
        fs.readFile(__dirname + "/data/user.json",function(err,data){
            if(err){
                console.error(err);
            }
            let datas = data.toString();
            datas = JSON.parse(datas);
            if(query && query.username){
                console.log(query.username);
                const out = datas.user_data.filter(item => String(item.username) === String(query.username));
                if(out.length > 0 && out[0].password === query.password){
                    console.log("Login successfully")
                    res.send({
                        resCode:0,
                        responseText:"Login successfully"
                    });
                    next();
                }
                else if(out.length > 0 && out[0].password != query.password){
                    console.log("Password error")
                    res.send({
                        resCode:1,
                        responseText:"Password error"
                    });
                    next();                    
                }
                else{
                    console.log("The user is not registered")
                    res.send({
                        resCode:1,
                        responseText:"The user is not registered"
                    });
                    next();
                }
            }
        })
    }
}