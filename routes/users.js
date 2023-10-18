const express=require('express')

var router=express.Router()

const{authAdmin}=require('../middlewares/authAdmin')

const {auth}=require('../middlewares/auth')

const {getAllUsers,addUser,getOneUser,updateUser,deleteUser,login,posts4specificUser}=require('../controllers/users')




router.get('/',getAllUsers)


router.post('/',addUser)


router.get('/:id',getOneUser)


router.patch('/:id',auth,updateUser)


router.delete('/:id',auth,authAdmin,deleteUser)


router.get('/:id/posts',posts4specificUser)







//authentication
router.post('/login',login)

module.exports=router