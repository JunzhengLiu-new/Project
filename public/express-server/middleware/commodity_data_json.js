const express = require("express");
const app = express()
const os = require("os");
const fs = require("fs");
app.use("/data",express.static("data"));
app.use(express.json());
module.exports = function(){
    return function(req,res,next){
            const query = req.body; 
            fs.readFile(__dirname + "/data/commodity.json",function(err,data){
                if(err){
                    console.error(err);
                }
                let datas = data.toString();
                datas = JSON.parse(datas);
                if(query && query.username){
                    const out = datas.commodity_data.filter(item => String(item.username) === String(query.username));
                    if (query.req_name === "change_state"){
                        if(query.params.current_state == "on saleChange"){
                            const target_item = out[0].commodity.filter(item => String(item.name) === String(query.params.name))
                            target_item[0]["state"] = "off sale"
                            const datasStr = JSON.stringify(datas);
                            fs.writeFile(__dirname + "/data/commodity.json",datasStr,function(err){
                                if(err){
                                    console.error(err);
                                    next();
                                }
                                else{
                                    res.send({
                                        resCode:0,
                                    });
                                }
                            }) 
                        }
                        else{
                            const target_item = out[0].commodity.filter(item => String(item.name) === String(query.params.name))
                            target_item[0]["state"] = "on sale"
                            const datasStr = JSON.stringify(datas);
                            fs.writeFile(__dirname + "/data/commodity.json",datasStr,function(err){
                                if(err){
                                    console.error(err);
                                    next();
                                }
                                else{
                                    res.send({
                                        resCode:0,
                                    });
                                }
                            }) 
                        }

                    }
                    else if(query.req_name === "delete"){
                        for(let i in out[0].commodity){
                            if (out[0].commodity[i].name === query.params){
                                out[0].commodity.splice(i,1)
                                const datasStr = JSON.stringify(datas);
                                fs.writeFile(__dirname + "/data/commodity.json",datasStr,function(err){
                                    if(err){
                                        console.error(err);
                                        next();
                                    }
                                    else{
                                        res.send({
                                            resCode:0,
                                            responseText:"Delete successfully!"
                                        });
                                    }
                                }) 
                            }
                        }
                    }
                    else{
                        res.send({
                            resCode:0,
                            responseData:out[0]
                        });
                        console.log("Show user_commodity successfully!")
                        next();    
                    }
 
                }
                else{
                    next()
                }
            })
        }
}