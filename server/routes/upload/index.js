const express = require("express");
const path = require("path");
const multer = require("multer");

let router = express.Router();

let storage =  multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../../public/img/upload/article'));
  },
  filename: function (req, file, cb) {
    let fileName = file.fieldname + '-' + Date.now() + file.originalname.match(/\.(jpg|png|gif|jpeg)$/i)[0];
    cb(null, fileName)
  }
});

const upload = multer({storage}).single("file");

router.post('/articleSurface',(req,res)=>{
  upload(req,res, function (err) {

    //发生错误
    if (err instanceof multer.MulterError){
      res.send(500);
    }else if (err){
      res.send(500);
    }else {
      //一切都好
      /*更新用户表*/
      res.send({
        code : 0,
        mag: "",
        surface: "http://118.190.201.130:3001/img/upload/article/"+req.file.filename
      });
    }
  })
});

module.exports = router;

