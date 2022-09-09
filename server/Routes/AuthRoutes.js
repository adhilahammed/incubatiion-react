const { register, login, userApplication, viewStatus } = require('../Controllers/AuthControllers')
const { checkUser } = require('../Middlewares/AuthMiddlewares')

const router=require('express').Router()

router.post('/',checkUser)

router.post('/register',register)

router.post('/login',login)

router.post('/userApplication',userApplication)    

router.get('/status/:id',viewStatus)

module.exports=router