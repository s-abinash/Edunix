const express=require('express')
const app=express.Router()
const con=require('../db')

const verifyToken=require('../auth/verifiy')

app.get('/',(req,res)=>{
    res.send("<h1>Node is Working Properly</h1>");
});

// Insert Operation
app.post('/insertUser', verifyToken, async (req,res)=>{
    let name=req.body.name;
    let userid=req.body.userid;
    let pass=req.body.pass;
    let mail=req.body.mail;
    let phone=req.body.phone;
    let sql={name:name,mail:mail,phone:phone,userid:userid,pass:pass}
    await con.query("INSERT INTO `users` SET ?",sql,  (err, result)=> {
        let resdata={message:""}
        if(err) resdata.message=err.sqlMessage;
        else resdata.message="Inserted Successfully";
        res.set('Content-Type', 'json');
        res.status(201);
        res.end(JSON.stringify(resdata));
    });
});

// Update Operation
app.post('/updateUser', verifyToken, async (req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let userid=req.body.userid;
    let pass=req.body.pass;
    let mail=req.body.mail;
    let phone=req.body.phone;
    let sql=[name,mail,phone,userid,pass,id]
    await con.query("UPDATE `users` SET `name`=?,`mail`=?,`phone`=?,`userid`=?,`pass`=? WHERE id=?",sql,  (err, result,fields)=> {
        let resdata={message:""}
        console.log(result);
        if(err) resdata.message=err.sqlMessage;
        else if(result.affectedRows>0) resdata.message="Updated Successfully";
        else resdata.message="No Rows Matched";
        res.set('Content-Type', 'json');
        res.status(201);
        res.end(JSON.stringify(resdata));
    });
});

// Delete Operation
app.post('/deleteUser', verifyToken, async (req,res)=>{
    let id=req.body.id;
    if(typeof id!=="undefined")
        await con.query("DELETE FROM `users` WHERE id=?",id,  (err, result,fields)=> {
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else if(result.affectedRows>0) resdata.message="Deleted Successfully";
            else resdata.message="No Rows Matched";
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });

});

// Select Operation
app.post('/getUser', verifyToken, async (req,res)=>{
    let id=req.body.id;
    if(typeof id!=="undefined")
        await con.query("SELECT * FROM `users` WHERE id=?",id,(err, result,fields)=> {
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else resdata.message="Fetched Successfully";
            resdata.data=result;
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
    else
        await con.query("SELECT * FROM `users`",(err, result, fields)=> {
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else resdata.message="Fetched Successfully";
            resdata.data=result;
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
});

module.exports = app