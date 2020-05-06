const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let message = mongoose.model('message',new Schema({
  /*关联用户表*/
  user: {type: Schema.Types.ObjectId, ref: "user", required: true},
  /*留言内容*/
  content: {type: String, required: true},
  /*日期*/
  date: {type: Date, default: Date.now},
  /*子留言*/
  children: [
    {
      /*子留言 用户*/
      user: {type: Schema.Types.ObjectId, ref: "user", required: true},
      /*子留言 内容*/
      content: {type: String, required: true},
      /*子留言 对象*/
      reUser: {type: String, required: true},
      /*子留言 日期*/
      date: {type: Date, default: Date.now},
    }
  ]
}));

module.exports = message;
