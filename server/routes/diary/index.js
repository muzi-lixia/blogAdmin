const express = require("express");
const diaryDB = require("../../db/diary");

const router = express.Router();
/*添加日记*/
router.post('/add',(req,res)=>{
  let {txt,img} = req.body;
  if (!txt && !img) {
    res.send({
      code: 3,
      msg: ""
    });
    return ;
  }
  let data = {};
  txt && (data.txt = txt);
  img && (data.img = img);
  diaryDB.create(data)
    .then(()=>{
      res.send({
        code: 0,
        msg: "发表成功"
      })
    })
    .catch(()=>{
      res.send({
        code: 4,
        msg: "服务器错误"
      })
    })
});

/*请求日记*/
router.get('/',(req,res)=>{
    diaryDB.find({},{},{sort:{date:-1}})
      .then(data=>{
        res.send({
          code: 0,
          msg: "查询成功",
          data
        })
      })
      .catch(()=>{
        res.send({
          code: 4,
          msg: "服务器错误",
          data: []
        })
      })
});

/*删除日记*/
router.post('/delete',(req,res)=>{
  let {_id} = req.body;
   diaryDB.deleteOne({_id})
     .then(()=>{
        res.send({
          code: 0,
          msg: "删除成功"
        })
   })
     .catch(()=>{
       res.send({
         code: 4,
         msg: "服务器错误"
       })
     })
});

module.exports = router;

