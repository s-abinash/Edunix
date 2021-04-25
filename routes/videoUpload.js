const express=require('express')
const app=express.Router()
const con=require('../db')
const fs = require('fs');
const AWS = require('aws-sdk');
const formidable = require('formidable')

const s3 = new AWS.S3({
    accessKeyId: 'AKIATLMFAKROPEP3KLPG',
    secretAccessKey: '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',
});

// const verifyToken=require('../auth/verifiy')


// Insert Operation
app.post('/',  async (req,res)=>{

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err)
            throw err
        }
        // console.log('Fields', fields)
        console.log('Files', files.file.path);
        console.log('Data', JSON.parse(fields.data));
        const fileContent = fs.readFileSync(files.file.path);
        const params = {
            Bucket: 'edunixcoda', // pass your bucket name
            Key: 'test2.jpg', // file will be saved as testBucket/contacts.csv
            Body: fileContent
        };
        s3.upload(params, function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`)
        });
    })

});


module.exports = app