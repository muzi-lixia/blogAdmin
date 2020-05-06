const mongoose = require('mongoose');
const articleInfoDB = require('./articleInfo');

let Schema = mongoose.Schema;

let articleSchema = new Schema({
  type: {type: String,required: true},
  title: {type: String,required: true},
  content: {type: String,required: true},
  updateDate : {type: Date,default: Date.now},
  date: {type: Date,default: Date.now},
  tag: {type: String,required: true},
  surface: {type: String,default: "http://118.190.201.130:3000/img/defaultSurface.jpg"},
  pv: {type: Number,default: 0},
  comment: [
    {type: Schema.Types.ObjectID,ref: 'comment'}
  ]
});

/*监听更新文章*/
articleSchema.pre("update",function (next) {
  console.log(1);
  /*更新数据的时候，更新修改时间*/
  this.update = new Date;
  next();
});

/*监听添加文章*/
articleSchema.pre("save",function (next) {
  //保存的时候，更新articleInfo表
  articleInfoDB.findOne()
    .then(data=>{
      if (data) {
        //如果存在data，更新data的tags和num
        articleInfoDB.updateOne({},{$inc:{num:1}})
          .then(()=>{})
          .catch(()=>{})
      }else{
        //如果还没有数据，就新建一条
        articleInfoDB.create({
          num: 1
        })
      }
    });
  next();
});

/*监听删除文章*/
articleSchema.pre("remove",{query:true,document: false},function (next) {
  articleInfoDB.findOne()
    .then(data=>{
      if (data) {
        //如果存在data，更新data的num
        articleInfoDB.updateOne({},{$inc:{num:-1}})
          .then(()=>{})
          .catch(()=>{})
      }
    });
  next();
});


let article = mongoose.model('article',articleSchema);

module.exports = article;
