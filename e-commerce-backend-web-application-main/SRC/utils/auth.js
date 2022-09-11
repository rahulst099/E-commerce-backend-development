const jwt = require("jsonwebtoken");
const User = require("../models/user");

function newToken(user){
    return jwt.sign({id: user.id}, 'relevel',{
        expiresIn: '1d'
    })
}

function verifyToken(token){

    try{
        let response = jwt.verify(token, 'relevel');
        return response;
    }catch(err){
       console.log(err);
       return;
    }
}

module.exports = {newToken, verifyToken}