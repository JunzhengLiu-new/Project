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
        fs.readFile(__dirname + "/data/role.json",function(err,data){
            if(err){
                console.error(err);
            }
            if(query && query.username){
                let datas = data.toString();
                datas = JSON.parse(datas);
                datas.role_data.push({username:query.username,role:[{"user_management":false,"role_management":false,"product":true,"chart":false}]})
                console.log(query)
                const datasStr = JSON.stringify(datas);
                fs.writeFile(__dirname + "/data/role.json",datasStr,function(err){
                    if(err){
                        console.error(err);
                        next();
                    }
                })
                next() 
            }
        })
    }
}