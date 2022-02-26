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
        fs.readFile(__dirname + "/data/commodity.json",function(err,data){
            if(err){
                console.error(err);
            }
            if(query){
                let datas = data.toString();
                datas = JSON.parse(datas);
                const out = datas.commodity_data.filter(item => String(item.username) === String(query.username));
                if(query.req_name === "detail"){
                    out[0].commodity.push(query.params.commodity_detail)
                    const datasStr = JSON.stringify(datas)
                    fs.writeFile(__dirname + "/data/commodity.json",datasStr,function(err,data){
                        if(err){
                            console.error(err);
                            return
                        }
                        else{
                            res.send({
                                resCode:0,
                                responseText:"Add successfully"
                            })
                        }
                    }) 
                }
            }
            else{
                next()
            }
        })

    }}