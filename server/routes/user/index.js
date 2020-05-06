const express = require("express");
const userDB = require("../../db/user");
const messageDB = require("../../db/message");
const sessionDB = require("../../db/session");
const visitorDB = require("../../db/visitor");
const router = express.Router();

/*获取用户信息*/
router.get('/get',(req,res)=>{
    userDB.find({},{psw:0,__v:0},{sort:{date:-1}}).then(data=>{
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

/*删除用户请求*/
router.post('/delete',(req,res)=>{
  let {_id} = req.body;
   /*删除该用户对应的留言*/
  messageDB.deleteMany({user: _id},()=>{});
  /*删除该用户对应的所有子留言*/
  messageDB.updateMany({"children.user":_id},{$pull:{children:{user:_id}}},()=>{});
   /*删除用户*/
  userDB.deleteOne({_id})
    .then(()=>{
      //删除对应的session    匹配session字段中_id,就全部删除
      //(用户登陆成功之后，在session字段中就会存在一个id，
      // 匹配到id值后，将整个session字段全部删除)
      sessionDB.deleteMany({session: new RegExp(_id)},()=>{});
      //删除最近访客
      visitorDB.deleteMany({user:_id},()=>{});
      //删除用户
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
   });
});

/*更新用户数据*/
router.post('/update',(req,res)=>{
   let {_id,data} = req.body;

   userDB.updateOne({_id},data)
     .then(()=>{
       sessionDB.deleteMany({session:new RegExp(_id)},()=>{});
       res.send({
         code: 0,
         msg: "更新成功"
       });
     })
     .catch(()=>{
       res.send({
         code: 4,
         msg: "服务器错误"
       });
     });
});

module.exports = router;