const mongoose = require('mongoose');

let user = mongoose.model('user',new mongoose.Schema({
  user: {type:String,require: true},
  psw: {type:String,require: true},
  /*注册时间*/
  regDate: {type:Number,default: Date.now},
  /*头像*/
  photo: {type:String,default: "http://118.190.201.130:3000/img/Sherry.jpg"},
  /*权限*/
  disabled: {type:Boolean,default: false},
  /*管理员权限*/
  admin: {type:Boolean,default: false}
}));

module.exports = user;
