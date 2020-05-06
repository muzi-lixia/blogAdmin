const express = require('express');
const articleDB = require('../../db/article');
const articleInfoDB = require('../../db/articleInfo');

let router = express.Router();

/*发表文章*/
router.post('/add',(req,res)=>{
  let {type, title, tag, surface, content} = req.body;
  /*后端验证*/
  if (!type || !title || !tag || !content){
    res.send({
      code : 1,
      msg : "数据不完整"
    });
    return ;
  }
  /*数据库存储*/
  articleDB.create(surface?{type, title, tag, surface, content}:{type, title, tag, content})
    .then(data=>{
      res.send({
        code : 0,
        msg : "发表成功"
      })
  }).catch(()=>{
    res.send({
      code : 4,
      mag : "服务器错误"
    })
  });
});

/*获取文章*/
router.get('/get',(req,res)=>{
  let {skip,limit} = req.query;
  articleDB.find({},{},{skip:skip*1,limit:limit*1})
    .then(data=>{
      res.send({
        code: 0,
        msg : "查询成功",
        data
      })
    }).catch(error=>{
    res.send({
        code:4,
        msg : "服务器错误",
        data: {}
      })
    });
});

/*文章删除*/
router.post('/delete',(req,res)=>{
  let {_id} = req.body;
  console.log(_id);
  //if (!_id)return;
  articleDB.remove({_id})
    .then(data=>{
      res.send({
        code:0,
        msg: "删除成功",
      });
    })
    .catch(()=>{
      res.send({
        code: 4,
        msg: "服务器错误"
      })
  });
});

/*文章更新*/
router.post('/update',(req,res)=>{
   let {_id,options} = req.body;
   articleDB.update({_id},options).then(()=>{
     res.send({
       code: 0,
       msg: "更新成功"
     });
   }).catch(()=>{
     res.send({
       code: 4,
       msg: "服务器错误"
     });
   });
});

/*文章信息获取*/
router.get('/getInfo',(req,res)=>{
  articleInfoDB.findOne({})
    .then(data=>{
      res.send({
        code: 0,
        msg: "查找成功",
        data
      })
    }).catch(()=>{
      res.send({
        code: 4,
        msg: "服务器错误",
        data:{}
      })
  });
});


module.exports = router;
