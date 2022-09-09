const UserModel = require("../Models/UserModel")
const jwt=require('jsonwebtoken')
const applicationModel = require("../Models/AppllicationModel")

const maxAge=3*24*60*60
const createToken=(id)=>{
     return jwt.sign({id},'my adil secret key adil',{
        expiresIn:maxAge
     })
}

const handleErrors=(err)=>{
    let errors={email:'',password:''}

  if(err.message==='incorrect Email') 
  errors.email='That email is not registered'

  if(err.message==='incorrect password') 
  errors.email='That password is incorrect'

    if(err.code===11000){
        errors.email='Email is already registered'
        errors.password='Application is already registered'
        return errors;
    }

    if(err.message.includes('Users validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message
        })
    }
    return errors
}

module.exports.register=async(req,res,next)=>{
    try {
        const{email,password}=req.body
        const user=await UserModel.create({email,password})
        const token=createToken(user._id)

        res.cookie('jwt',token,{
            withCrdentials:true,
            httpOnly:false,
            maxAge:maxAge*1000
        })
        res.status(201).json({user:user._id,created:true})
    } catch (err) {
        console.log(err);
        const errors=handleErrors(err)
        res.json({errors,created:false})
    }
}
module.exports.login=async(req,res,next)=>{
    try {
        const{email,password}=req.body
        const user=await UserModel.login(email,password)
        const token=createToken(user._id)

        res.cookie('jwt',token,{
            withCrdentials:true,
            httpOnly:false,
            maxAge:maxAge*1000
        })
        res.status(200).json({user:user._id,created:true})
    } catch (err) {
        console.log(err);
        const errors=handleErrors(err)
        res.json({errors,created:false})
    }
}

module.exports.userApplication=async (req, res) => {
    try {
      console.log(req.body.userId);
      const {
        name,
        email,
        address,
        city,
        state,
        phoneNo,
        companyName,
        team,
        product,
        problem,
        solution,
        proposition,
        competators,
        revenue,
        market,
        plan,
        type,
        proposal,   
        userId,
        // auth,
      } = req.body;
      if (
        name &&
        email &&
        address &&
        city &&
        state &&
        phoneNo &&
        companyName &&
        team &&
        product &&
        problem &&
        solution &&
        proposition &&
        competators &&
        revenue &&
        market &&
        plan &&
        type &&
        proposal &&
        userId 
        // auth
      ) {
        console.log("Reg Success");
        const newApplication = await applicationModel.create({
          name,
          email,
          address,
          city,
          state,
          phoneNo,
          companyName,
          team,
          product,
          problem,
          solution,
          proposition,
          competators,
          revenue,
          market,
          plan,
          type,
          proposal,
          status: "PENDING",
          userId,
          bookingStatus: false,
          slotCode: "null",
        });
        res.status(201).json({ newApplication });
      } else {
        console.log("Reg Failed");
        res.status(401).json({ Error });
      }
    } catch (err) {
      console.log("Reg Failedddddddd");
      const errors=handleErrors(err)
      res.json({errors,created:false})

    }
  };

  module.exports.viewStatus = async (req, res) => {
    console.log("Statusssssssssssssss");
    console.log(req.params.id);
    const ViewStatus = await applicationModel.find({ userId: req.params.id });
    res.json(ViewStatus);
  };

  



  
  