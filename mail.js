const express=require('express')
const app=express.Router()
const mailjet = require ('node-mailjet').connect('', '');

app.post('/sendMail', async (req,res)=> {
    let mailto=req.body.to;
    let mailname=req.body.name;
    mailjet.post("send", {'version': 'v3.1'}).request({
        "Messages":[
            {
                "From": {
                    "Email": "keca3family@gmail.com",
                    "Name": "Abinash S"
                },
                "To": [
                    {
                        "Email": mailto,
                        "Name": mailname
                    }
                ],
                "Subject": "Hola "+mailname,
                "TextPart": "Welcome to Edunix",
                "HTMLPart": "<h1>Welcome to Edunix Account</h1><br><p>You can now access courses offered by tech geeks</p>",
                "CustomID": "AppGettingStartedTest"
            }
        ]
    });
    res.send('Sent Successfully')
});

module.exports = app