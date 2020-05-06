const mongoose = require('mongoose');

let articleInfo = mongoose.model('articleInfo',new mongoose.Schema({
  tags: {
    type: Array,
    default: ["HTML5&CSS3","Javascript","NodeJs","Vue&React","Other"]
  },
  num: Number
}));

module.exports = articleInfo;
