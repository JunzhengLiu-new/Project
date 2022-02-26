const express = require("express");
const app = express()
const os = require("os");
const fs = require("fs");
const { dirname } = require("path");
app.use("/data",express.static("data"));
app.use(express.json());
module.exports = function(){
    return function(req,res,next){
        const query = req.body;
        fs.readFile(__dirname + "/data/user.json",function(err,data){
            if(err){
                console.error(err);
                return
            }
            if(query && query.username){
                let datas = data.toString();
                datas = JSON.parse(datas);
                datas.user_data.push(query);
                const datasStr = JSON.stringify(datas);
                const out = datas.user_data.filter(item => String(item.username) === String(query.username));
                if(out.length > 1){
                    console.log("The user is already registered")
                    res.send({
                        resCode:1,
                        responseText:"The user is already registered"
                    });
                    next();
                }
                else{
                    fs.writeFile(__dirname + "/data/user.json",datasStr,function(err){
                        if(err){
                            console.error(err);
                            next();
                        }
                    }) 
                    res.send({
                        resCode:0,
                        responseText:"Register successfully!"
                    });
                    next();
                    console.log("Register successfully!")
                }
            }
        })
    }
}