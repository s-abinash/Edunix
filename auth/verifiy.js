const jwt = require('jsonwebtoken');

// Format of Token:
// Authorization: Bearer <access_token>


const verifyToken = (req,res,next)=>{
    // Get Auth header value
    // console.log(req.headers)
    const Header=req.headers['authorization']
    // Check if undefined
    if(typeof Header!='undefined'){
        // Split at the space
        req.token=Header.split(' ')[1];
        // Call next Middleware
        next();
    }
    else {
        res.sendStatus(403)
    }
}

module.exports=verifyToken