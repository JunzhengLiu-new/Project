import axios_new from "./axios_new.js"
export const req_login = (username, password)=>{
    return axios_new("/login",{username,password},"POST")
}

export const req_register = (username, password)=>{
    return axios_new("/register",{username,password},"POST")
}

export const req_category_show = (username)=>{
    return axios_new("/product/category",{username},"POST")
}

export const req_category = (username,params,req_name)=>{
    return axios_new("/product/category",{username,params,req_name},"POST")
}

export const req_commodity = (username,params,req_name)=>{
    return axios_new("/product/commodity",{username,params,req_name},"POST")
}

export const req_add_item_detail = (username,params,req_name)=>{
    return axios_new("/product/commodity/addupdate",{username,params,req_name},"POST")
}
export const req_commodity_item_detail = (username,params,req_name)=>{
    return axios_new("/product/commodity/detail",{username,params,req_name},"POST")
}


export const req_role_show = (username,params,req_name)=>{
    return axios_new("/role",{username,params,req_name},"POST")
}