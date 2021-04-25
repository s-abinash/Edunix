const express=require('express')
const app=express.Router()
const con=require('../db')
const fs = require('fs');
const formidable = require('formidable')

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: '',
});
// const verifyToken=require('../auth/verifiy')

app.get('/',(req,res)=>{
    res.send("<h1>Node is Working Properly</h1>");
});

// Insert Operation
app.post('/insertCourse', (req,res)=>{
    console.log(req.body)
    let name=req.body.title;
    let description=req.body.description;
    let author=req.body.author;
    let category=req.body.category;

    let sql={name:name,description:description,author:author,category:category}
    con.query("INSERT INTO `course` SET ?", sql,  (err, result)=> {
        console.log(err)
        console.log(result)
        let resdata={message:"",error:false,id:''}
        if(err){
            resdata.message=err.sqlMessage;
            resdata.error=true;
        }
        else resdata.message="Inserted Successfully";
        console.log(result)
        resdata.id=result.insertId;
        resdata.error=result.insertId<1;
        res.set('Content-Type', 'json');
        res.status(201);
        res.end(JSON.stringify(resdata));
    });

});

// Update Operation
app.post('/updateCourse', async (req,res)=>{
    let id=req.body.id;
    let name=req.body.title;
    let description=req.body.description;
    let author=req.body.author;
    let category=req.body.category;
    let sql=[name,description,author,category,id]
    await con.query("UPDATE `course` SET `name`=?,`description`=?,`author`=?,`category`=? WHERE id=?",sql,(err, result,fields)=> {
        let resdata={message:"",error:false}
        console.log(result);
        if(err){
            resdata.message=err.sqlMessage;
            resdata.error=true;
        }
        else if(result.affectedRows>0) resdata.message="Updated Successfully";
        else resdata.message="No Rows Matched";
        res.set('Content-Type', 'json');
        res.status(201);
        res.end(JSON.stringify(resdata));
    });
});

// Delete Operation
app.post('/deleteCourse',async (req,res)=>{
    let id=7;
    let key='course_' + id+'/';
    console.log(key)
    if(typeof id!=="undefined") {
        const params = {
            Bucket: 'edunixcoda', // pass your bucket name
            Key: key, // file will be saved as testBucket/contacts.csv
        };
        s3.deleteObject(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });

        await con.query("DELETE FROM `course` WHERE id=?", id, (err, result, fields) => {
            let resdata = {message: "", data: ""}
            if (err) resdata.message = err.sqlMessage;
            else if (result.affectedRows > 0) resdata.message = "Deleted Successfully";
            else resdata.message = "No Rows Matched";
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
    }

});

// Select Operation
app.post('/getCourse', async (req,res)=>{
    let id=req.body.id;
    if(typeof id!=="undefined")
        await con.query("SELECT * FROM `course` WHERE id=?",id,(err, result,fields)=> {
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else resdata.message="Fetched Successfully";
            resdata.data=result;
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
    else
        await con.query("SELECT * FROM `course`",(err, result, fields)=> {
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