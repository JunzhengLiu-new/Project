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
        fs.readFile(__dirname + "/data/category.json",function(err,data){
            if(err){
                console.error(err);
            }
            if(query && query.username){
                let datas = data.toString();
                datas = JSON.parse(datas);
                const out = datas.category_data.filter(item => String(item.username) === String(query.username));
                if(out.length > 1){
                    next();
                }
                else{
                    datas.category_data.push({username:query.username,category:[]});
                    const datasStr = JSON.stringify(datas);
                    fs.writeFile(__dirname + "/data/category.json",datasStr,function(err){
                        if(err){
                            console.error(err);
                            next();
                        }
                    }) 
                    next()
                }
            }
        })
    }
}