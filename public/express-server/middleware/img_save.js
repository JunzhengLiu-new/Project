
const express = require("express");
const app = express()
const os = require("os");
const fs = require("fs");
const { dirname } = require("path");
app.use("/data",express.static("data"));
app.use(express.json());
module.exports = function(){
    return function(req,res,next){
        const query = req.body
        const file_path = req.file.path
        fs.readFile(__dirname + "/data/commodity.json",function(err,data){
            if(err){
                console.error(err);
            }
            let datas = data.toString();
            datas = JSON.parse(datas);
            if(query){
                const out = datas.commodity_data.filter((item) => {
                    if (String(item.username) === String(query.username)){return item}})
                const target_item = out[0].commodity.filter(item => String(item.name) === String(query.commodityname))
                const previous_file_path = target_item[0]["detail"]["img"]
                target_item[0]["detail"]["img"] = file_path
                const datasStr = JSON.stringify(datas)
                fs.writeFile(__dirname + "/data/commodity.json",datasStr,function(err,data){
                    if(err){
                        console.error(err);
                        return
                    }
                    else{
                        res.send({
                            resCode:0,
                            responseText:"Img add successfully"
                        })
                    }
                }) 
                if (!fs.existsSync(previous_file_path)) {
                    console.log("The file not exist")
                    return
                }
                else{
                    fs.unlinkSync(previous_file_path);
                    console.log('Delete' + previous_file_path + ' successfully');
                }
            }

})

}}