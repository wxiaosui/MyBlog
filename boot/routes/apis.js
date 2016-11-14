var express = require('express');
var router = express.Router();
var createConn = require("../sources/CreateConn");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function checkUserAndPassword(req,res,next) {
  if (!req.body.user){
    res.json({state: 3, message: "No user name present"});
    return;
  }
  if (!req.body.pass) {
    res.json({state: 4, message: "No password present"});
    return;
  }
  next();
}

router.post('/login',checkUserAndPassword)
    .post('/login',function (req,res) {
      let conn = createConn();

      conn.connect1().then(function () {
        return conn.query1("SELECT * FROM `users` WHERE `user`=?",[req.body.user]);
      }).then(function (rows) {
        if (rows.length){
          var result = rows[0];
          if (req.body.pass == result.pass) {
            res.json({state: 1, message: "OK"});
          } else {
            res.json({state: 6, message: "Password wrong"});
          }
        }else {
          res.json({state: 5, message: "No such user"});//用户名不存在
        }
        conn.end();
      }).catch(function (error) {
        console.log(error);
        res.json({state: error.errno, message: error.code});
      });
    });

router.post('/save',function (req,res) {
      let conn = createConn();

      conn.connect1().then(result=>{
        return conn.query1("INSERT INTO `test` (`title`,`art`) VALUES (?,?) ", [req.body.title,req.body.art]);
        conn.end();
      }).then(result=>{
        res.json({state: 1, message: "OK"});

        conn.end();
      }).catch(error=> {
        console.log(error);
        res.json({state: error.errno, message: error.code});
      });
    });

router.post('/show',function (req,res,next) {
  let conn = createConn();
  conn.connect(function (err) {
    if (!err){
      conn.query("SELECT * FROM `test`", function (err,rows) {
        if (!err) {
          res.render({test: rows});
        } else {
          res.json(err);
        }
        conn.end();
      })
    }else {
      res.json(err);
    }
  })
});


module.exports = router;
