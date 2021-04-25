const express=require('express')
const app=express.Router()
const con=require('../db')

// const verifyToken=require('../auth/verifiy')

app.post('/giveComment', async (req,res)=>{
    let userid=req.body.userid;
    let courseid=req.body.courseid;
    let comment=req.body.comment;
    let rating=req.body.rating;
    let name=req.body.name;
    let sql={userid:userid,courseid:courseid,comment:comment,rating:rating,username:name}
    await con.query("INSERT INTO `comment` SET ?",sql,  (err, result)=> {
        let resdata={message:""}
        if(err) resdata.message=err.sqlMessage;
        else resdata.message="Inserted Successfully";
        res.set('Content-Type', 'json');
        res.status(201);
        res.end(JSON.stringify(resdata));
    });
});

app.post('/getComment', async (req,res)=>{
    console.log(req.body)
    let userid=req.body.userid;
    let courseid=req.body.courseid;
    if(typeof userid!=="undefined")
        await con.query("SELECT * FROM `comment` WHERE userid=? and courseid=?",[userid,courseid],(err, result,fields)=> {
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else resdata.message="Fetched Successfully";
            console.log(result)
            resdata.data=result;
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
    else if(typeof courseid!=="undefined")
        await con.query("SELECT * FROM `comment` WHERE courseid=?",courseid,(err, result, fields)=> {
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else resdata.message="Fetched Successfully";
            resdata.data=result;
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
    else
    {
        await con.query("SELECT * FROM `comment`",(err, result, fields)=> {
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else resdata.message="Fetched Successfully";
            resdata.data=result;
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
    }
});

app.get('/getStatistics', async (req,res)=> {
    let comment=0,user=0,course=0,video=0
    await con.query("SELECT COUNT(*) as c FROM `comment`",function (err, result, fields){
        setValue('com',result[0].c)
    });
    await con.query("SELECT COUNT(*) as c FROM `content`",function (err, result, fields){
        setValue('con',result[0].c)
    });
    await con.query("SELECT COUNT(*) as c FROM `course`",function (err, result, fields){
        setValue('cou',result[0].c)
    });
    await con.query("SELECT COUNT(*) as c FROM `users`",function (err, result, fields){
        setValue('user',result[0].c)
        setValue('send',0)
    });
    async function setValue(id,value) {
        console.log(value)
        if(id=='com')
            comment=value
        else if(id=='con')
            video=value
        else if(id=='cou')
            course=value
        else if(id=='user')
            user=value
        else
            res.send(JSON.stringify({
                comment,user,course,video
            }))
    }
});



    module.exports = app