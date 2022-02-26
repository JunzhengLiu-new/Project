const express = require("express");
const app = express()
const os = require("os");
const fs = require("fs");
app.use("/data",express.static("data"));
app.use(express.json());
module.exports = function(){
    return function(req,res,next){
        const query = req.body; 
        if (query.req_name === "delete"){
            console.log(query.params)
            fs.readFile(__dirname + "/data/category.json",function(err,data){
                if(err){
                    console.error(err);
                }
                let datas = data.toString();
                datas = JSON.parse(datas);
                if(query && query.username && query.params){
                    console.log(query.params)
                    const out = datas.category_data.filter((item) => {
                        if (String(item.username) === String(query.username))
                        {
                            const target_category = item
                            if (typeof query.params === "string"){
                                const delete_index = item["category"].findIndex(c => c === String(query.params))
                                target_category.category.splice(delete_index,1)
                                delete target_category[query.params]
                            }
                            else{
                                const delete_index = item[query.params.sub_category_name[1]].findIndex(c => c === String(query.params.category_name))
                                target_category[query.params.sub_category_name[1]].splice(delete_index,1)
                            }

                            const datasStr = JSON.stringify(datas)
                            fs.writeFile(__dirname + "/data/category.json",datasStr,function(err){
                                if(err){
                                    console.error(err);
                                    next();
                                }
                                res.send({
                                    resCode:0,
                                    responseText:"Delete successfully!"
                                });                                
                            })
                        }
                        
                    })
                }
            })
        }
        else if(query.req_name === "modify"){
            fs.readFile(__dirname + "/data/category.json",function(err,data){
                if(err){
                    console.error(err);
                }
                let datas = data.toString();
                datas = JSON.parse(datas);
                if(query && query.username && query.params){
                    const out = datas.category_data.filter((item) => {
                        if (String(item.username) === String(query.username))
                        {
                            const target_category = item
                            console.log(query.params)
                            if(query.params.sub_category_name.length === 1){
                                const delete_index = item["category"].findIndex(c => c === String(query.params.category_name))
                                if (delete_index === -1){
                                    target_category.category.push(query.params.category_value);
                                    target_category[query.params.category_value] = []
                                    const datasStr = JSON.stringify(datas)
                                    fs.writeFile(__dirname + "/data/category.json",datasStr,function(err){
                                        if(err){
                                            console.error(err);
                                            next();
                                        }
                                    })
                                    res.send({
                                        resCode:0,
                                        responseText:"change category successfully!"
                                    });
                                    console.log("change category successfully!")
                                    next();
                                }
                                else{
                                    target_category.category.splice(delete_index,1)
                                    target_category.category.push(query.params.category_value);
                                    target_category[query.params.category_value] = target_category[query.params.category_name]
                                    delete target_category[query.params.category_name]
                                    const datasStr = JSON.stringify(datas)
                                    fs.writeFile(__dirname + "/data/category.json",datasStr,function(err){
                                        if(err){
                                            console.error(err);
                                            next();
                                        }
                                    })
                                    res.send({
                                        resCode:0,
                                        responseText:"change category successfully!"
                                    });
                                    console.log("change category successfully!")
                                    next();
                                }

                            }
                            else{
                                const delete_index = item[query.params.sub_category_name[1]].findIndex(c => c === String(query.params.category_name))
                                if (delete_index === -1){
                                    target_category[query.params.sub_category_name[1]].push(query.params.category_value);
                                    const datasStr = JSON.stringify(datas)
                                    fs.writeFile(__dirname + "/data/category.json",datasStr,function(err){
                                        if(err){
                                            console.error(err);
                                            next();
                                        }
                                    })
                                    res.send({
                                        resCode:0,
                                        responseText:"change category successfully!"
                                    });
                                    console.log("change category successfully!")
                                    next();
                                }
                                else{
                                    target_category[query.params.sub_category_name[1]].splice(delete_index,1)
                                    target_category[query.params.sub_category_name[1]].push(query.params.category_value)
                                    const datasStr = JSON.stringify(datas)
                                    fs.writeFile(__dirname + "/data/category.json",datasStr,function(err){
                                        if(err){
                                            console.error(err);
                                            next();
                                        }
                                    })
                                    res.send({
                                        resCode:0,
                                        responseText:"change category successfully!"
                                    });
                                    console.log("change category successfully!")
                                    next();
                                }
                            }
                    }}
                )}
            }
        )}
        else{
            fs.readFile(__dirname + "/data/category.json",function(err,data){
                if(err){
                    console.error(err);
                }
                let datas = data.toString();
                datas = JSON.parse(datas);
                if(query && query.username){
                    const out = datas.category_data.filter(item => String(item.username) === String(query.username));
                    res.send({
                        resCode:0,
                        responseData:out
                    });
                    console.log("Show user_category successfully!")
                    next();
                    }
                }
            // 
            )
        }

    }
}