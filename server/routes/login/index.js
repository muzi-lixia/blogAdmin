const express = require("express");
const userDB = require("../../db/user");
const crypto = require("crypto");

const router = express.Router();

/*登录*/
router.post('/',(req,res)=>{
   let {user,psw} = req.body;
  userDB.findOne({user}).then(data=>{
    if (data) {
      /*有这个用户*/
      if (data.psw === crypto.createHash("sha256").update(psw).digest("hex")) {
        //密码正确
        if (data.admin) {
          //验证管理员权限
          //是管理员
          //写入session
          req.session.login = data;

          res.send({
            code: 0,
            msg: "登陆成功"
          });
        }else{
          //不是管理员
          res.send({
            code: 1,
            msg: "您不是管理员,无法登录~~"
          });
        }
      }else{
        //密码不正确
        res.send({
          code: 1,
          msg: "密码错误"
        });
      }
    }else{
      //没有这个用户
      res.send({
        code: 1,
        msg: "用户不存在"
      });
    }
  }).catch(()=>{
    res.send({
      code: 4,
      msg: "服务器错误"
    })
  })
});

/*验证登录*/
router.post('/ifLogin',(req,res)=>{
   /*判断session*/
  if (req.session.login && req.session.login.admin) {
    res.send({
      code: 0,
      msg: "已登录",
      data: req.session.login
    });
  }else{
    res.send({
      code: 1,
      msg: "未登录",
      data: null
    });
  }
});

/*推出登录*/
router.post('/logOut',(req,res)=>{
  req.session.destroy();
  res.send({
    code : 0,
    msg : "退出登录成功"
  });
});

module.exports = router;

