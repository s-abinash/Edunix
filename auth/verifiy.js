const jwt = require('jsonwebtoken');

// Format of Token:
// Authorization: Bearer <access_token>


const verifyToken = (req,res,next)=>{
    // Get Auth header value

    const Header=req.headers['Authorization']
    // Check if undefined
    if(typeof Header!='undefined'){
        // Split at the space
        let token=Header.split(' ')[1];
        let decoded=jwt.verify(token, 'mysecretkey')
        // Call next Middleware
        if(typeof decoded=="undefined") res.sendStatus(403)
        next();
    }
    else {
        res.sendStatus(403)
    }
}

module.exports=verifyToken