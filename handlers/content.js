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

function createID() {
    let result           = [];
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

// const verifyToken=require('../auth/verifiy')

app.get('/',(req,res)=>{
    res.send("<h1>Node is Working Properly</h1>");
});

app.post('/insertContent', async (req,res)=>{

    await new formidable.IncomingForm().parse(req, async(err, fields, files) => {
        if (err) {
            console.error('Error', err)
            throw err
        }
        let form=JSON.parse(fields.data);
        console.log(form)
        const fileContent = fs.readFileSync(files.file.path);
        const params = {
            Bucket: 'edunixcoda', // pass your bucket name
            Key: 'course_'+form.course+'/'+createID()+'.mp4', // file will be saved as testBucket/contacts.csv
            Body: fileContent
        };
        let fileLoc,fileKey;

        await s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
            fileLoc=data.Location;
            fileKey=data.Key;
            let sql={course:form.course,name:form.name,description:form.description,link:fileLoc,filekey:fileKey}
            con.query("INSERT INTO `content` SET ?", sql,  (err, result)=> {
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
    })
});

app.post('/updateContent', async (req,res)=>{

    await new formidable.IncomingForm().parse(req, async(err, fields, files) => {
        if (err) {
            console.error('Error', err)
            throw err
        }
        let form=JSON.parse(fields.data);
        if(typeof files.file!=='undefined') {
            const fileContent = fs.readFileSync(files.file.path);
            const params = {
                Bucket: 'edunixcoda', // pass your bucket name
                Key: form.key, // file will be saved as testBucket/contacts.csv
                Body: fileContent
            };
            let fileLoc, fileKey;

            await s3.upload(params, function (s3Err, data) {
                if (s3Err) throw s3Err
                console.log(`File uploaded successfully at ${data.Location}`)
                fileKey = data.Key
                fileLoc = data.Location;
                let sql = [form.name, form.description, form.id]
                con.query("UPDATE `content` SET `name`=?,`description`=? WHERE id=?", sql, (err, result) => {
                    console.log(err)
                    console.log(result)
                    let resdata = {message: "", error: false, id: ''}
                    if (err) {
                        resdata.message = err.sqlMessage;
                        resdata.error = true;
                    } else resdata.message = "Updated Successfully";
                    console.log(result)
                    res.set('Content-Type', 'json');
                    res.status(201);
                    res.end(JSON.stringify(resdata));
                });
            });
        }
        else
        {
            let sql = [form.name, form.description, form.id]
            con.query("UPDATE `content` SET `name`=?,`description`=? WHERE id=?", sql, (err, result) => {
                let resdata = {message: "", error: false, id: ''}
                if (err) {
                    resdata.message = err.sqlMessage;
                    resdata.error = true;
                } else resdata.message = "Updated Successfully";
                console.log(result)
                res.set('Content-Type', 'json');
                res.status(201);
                res.end(JSON.stringify(resdata));
            });
        }
    })
});

app.post('/deleteContent', async (req,res)=>{
    let id=req.body.id;
    let key=req.body.key;
    if(typeof id!=="undefined")
        await con.query("DELETE FROM `content` WHERE id=?",id,(err, result,fields)=> {
            const params = {
                Bucket: 'edunixcoda', // pass your bucket name
                Key: key, // file will be saved as testBucket/contacts.csv
            };
            s3.deleteObject(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
            });
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else if(result.affectedRows>0) resdata.message="Deleted Successfully";
            else resdata.message="No Rows Matched";
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
});


app.post('/getContent', async (req,res)=>{
    let id=req.body.id;
    let course=req.body.courseid;
    console.log(req.body)
    if(typeof id!=="undefined")
        await con.query("SELECT * FROM `content` WHERE id=? and course=?",[id,course],(err, result,fields)=> {
            let resdata={message:"", data:""}
            if(err) resdata.message=err.sqlMessage;
            else resdata.message="Fetched Successfully";
            resdata.data=result;
            res.set('Content-Type', 'json');
            res.status(201);
            res.end(JSON.stringify(resdata));
        });
    else
        await con.query("SELECT * FROM `content` WHERE course=?",course,(err, result, fields)=> {
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