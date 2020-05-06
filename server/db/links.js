const mongoose = require('mongoose');

let links = mongoose.model('links',new mongoose.Schema({
  name: {type: String,required: true},
  href: {type: String,required: true},
  icon: {type: String,required: true},
  desc: {type: String,required: true},
}));

module.exports = links;
