const express = require("express");

const messageDB = require("../../db/message");

const router = express.Router();

/*请求留言列表*/
router.get('/get',(req,res)=>{
  messageDB.find({},{},{sort:{date:-1}}).populate("user")
    .then(data=>{
      res.send({
        code: 0,
        msg: "查询成功",
        data
      })
    }).catch(()=>{
    res.send({
      code: 4,
      msg: "服务器错误",
      data: []
    })
  })
});

/*删除留言*/
router.post('/delete',(req,res)=>{
   let {_id} = req.body;

   messageDB.deleteOne({_id}).then(data=>{
     res.send({
       code: 0,
       msg: "删除成功"
     })
   }).catch(()=>{
     res.send({
       code: 4,
       msg: "服务器错误"
     })
   });
});


module.exports = router;