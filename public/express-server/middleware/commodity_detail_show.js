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
            if(query){
                const out = datas.commodity_data.filter(item => String(item.username) === String(query.username));
                console.log(out)
                if(query.req_name === "change_detail"){
                    const target_item = out[0].commodity.filter(item => String(item.name) === String(query.params.name))
                    console.log(target_item[0])
                    target_item[0]["description"] = query.params.description
                    target_item[0]["price"] = query.params.price
                    target_item[0]["detail"]["category"] = query.params.category
                    const datasStr = JSON.stringify(datas)
                    fs.writeFile(__dirname + "/data/commodity.json",datasStr,function(err,data){
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
                else{
                    const target_item = out[0]["commodity"].filter(item => String(item.name) === String(query.params));
                    res.send(target_item[0])
                }

            }
        })
    }
}
