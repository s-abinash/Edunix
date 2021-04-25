const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const con=require('../db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


app.post('/login',(req,res)=>{
    // Hashing
    // let hashedPassword = bcrypt.hashSync(req.body.pass, 8);
    console.log(req.body)
    let pass=req.body.pass;
    let userid=req.body.userid;
    let creator=req.body.creator;
    let sql=[userid,pass],sqlcontent
    if(creator===false)
    {
         sqlcontent="SELECT * FROM `users` WHERE userid like ? && pass like ?";
    }
    else
    {
         sqlcontent="SELECT * FROM `admin` WHERE admin like ? && pass like ?";
    }
    con.query(sqlcontent,sql,(err, result)=> {
        let resdata={message:""}
        console.log(result);
        if(err) resdata.message=err.sqlMessage;
        if((result.length)===0){
            res.json({
                auth: false,
                message: "User ID or Password Incorrect"
            });
        }
        else
        {
            let token = jwt.sign({userid: userid,pass: pass}, process.env.SECRET, {expiresIn: 86400});
            res.json({
                auth: true,
                message: "Login Successful",
                name: result[0].name,
                id: result[0].id,
                token: token
            });
        }
    });
});
app.post('/signup',(req,res)=>{
    // Hashing
    // let hashedPassword = bcrypt.hashSync(req.body.pass, 8);
    console.log(req.body)
    let pass=req.body.pass;
    let userid=req.body.userid;
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;

    let sql={name:name,mail:email,phone:phone,userid:userid,pass:pass}

    con.query("INSERT INTO `users` SET ?",sql,(err, result)=> {
        let resdata={message:"",error:false,id:''}
        if(err){
            resdata.message=err.sqlMessage;
            resdata.error=true;
        }
        else resdata.message="Signed Up Successfully";
        res.set('Content-Type', 'json');
        res.status(201);
        res.end(JSON.stringify(resdata));
    });

});

module.exports = app;