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
    let sql=[userid,pass]

    con.query("SELECT * FROM `users` WHERE userid like ? && pass like ?",sql,(err, result)=> {
        let resdata={message:""}
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
                token: token
            });
        }
    });
});

module.exports = app;