
const jwt=require('jsonwebtoken')
const AdminModel = require('../Models/AdminModel')

module.exports.checkAdmin=(req,res,next)=>{
    const token=req.cookies.jwt
    console.log(token);
    if(token){
       jwt.verify(token,'adil super secret key',async(err,decodedToken)=>{
        if(err){
            res.json({status:false}) 
            next()
            console.log('ddddddd');
        }else{
            const user=await AdminModel.findById(decodedToken.id)
            if(user){
                res.json({status:true,user:user.email})
                console.log('aaaa');
            }else{
                res.json({status:false}) 
                next()
                console.log('bbb');
            }
        }
       })
    }else{
        res.json({status:false})
        next()
        console.log('ccccc');
    }
}