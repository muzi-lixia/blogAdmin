const express = require("express");
const linksDB = require("../../db/links");

const router = express.Router();
/*添加友链*/
router.post('/add',(req,res)=>{
  let options = req.body;
  linksDB.create(options)
    .then(()=>{
      res.send({
        code: 0,
        msg: "添加成功"
      })
    })
    .catch(()=>{
      res.send({
        code: 4,
        msg: "服务器错误"
      })
    })
});

/*请求友链*/
router.get('/',(req,res)=>{
  linksDB.find({})
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

/*删除友链*/
router.post('/delete',(req,res)=>{
  let {_id} = req.body;
  linksDB.deleteOne({_id})
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

