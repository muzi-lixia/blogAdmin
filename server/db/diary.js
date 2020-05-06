const mongoose = require('mongoose');

let diary = mongoose.model('diary',new mongoose.Schema({
  txt: String,
  img: String,
  date : {type: Date,default: Date.now}
}));

module.exports = diary;
