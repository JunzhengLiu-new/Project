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
            if(query){
                let datas = data.toString();
                datas = JSON.parse(datas);
                if(query.req_name === "change"){
                    const out = datas.role_data.filter(item => String(item.username) === String(query.username));
                    out[0].role[0].product = query.params.product_value
                    out[0].role[0].chart = query.params.chart_value
                    const datasStr = JSON.stringify(datas)
                    fs.writeFile(__dirname + "/data/role.json",datasStr,function(err,data){
                        if(err){
                            console.error(err);
                            return
                        }
                        else{
                            res.send({
                                resCode:0,
                                responseText:"Change successfully"
                            })
                        }
                    }) 

                }
                else if(query.req_name === "user_role"){
                    const out = datas.role_data.filter(item => String(item.username) === String(query.username));
                    console.log(out[0].role)
                    res.send({
                        resCode:0,
                        responseDatas:out[0].role
                    })
                }
                else{
                    res.send({
                        resCode:0,
                        responseDatas:datas
                    })
                }

            }
        })
    }
}