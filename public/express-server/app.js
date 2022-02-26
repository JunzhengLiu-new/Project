const express = require("express")
const app = express()
const user_data_write_json = require("./middleware/user_data_write_json")
const user_data_authority_json = require("./middleware/user_data_authority_json")
const category_data_json = require("./middleware/category_data_json")
const category_data_json_init = require("./middleware/category_data_json_init")
const commodity_data_json = require("./middleware/commodity_data_json")
const commodity_data_json_init = require("./middleware/commodity_data_json_init")
const commodity_add_item_detail = require("./middleware/commodity_add_item_detail")
const commodity_detail_show = require("./middleware/commodity_detail_show")
const role_data_json = require("./middleware/role_data_json")
const role_data_json_init = require("./middleware/role_data_json_init")
const img_save = require("./middleware/img_save")
const multer =require('multer');
app.use(express.json());
app.use("/register",user_data_write_json())
app.use("/register",category_data_json_init())
app.use("/register",commodity_data_json_init())
app.use("/register",role_data_json_init())
app.use("/login",user_data_authority_json())
app.use("/role",role_data_json())

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        const originalnameAndSuffix = file.originalname.split(".");
        const suffixIndex = originalnameAndSuffix.length - 1;
        const suffix = originalnameAndSuffix[suffixIndex];
        cb(null, file.originalname.split(".")[0] + Date.now() +'.'+ suffix);
    }
    });
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
    }).single("singlefile");
app.use('/product/commodity/addupdate/img',express.static(__dirname+'/uploads'))
app.use('/product/commodity/addupdate/img',upload,img_save())
app.use('/product/commodity/addupdate',commodity_add_item_detail())
app.use('/product/commodity/detail',commodity_detail_show())
app.use("/product/category",category_data_json())
app.use("/product/commodity",commodity_data_json())





app.listen(5000,()=>{})
