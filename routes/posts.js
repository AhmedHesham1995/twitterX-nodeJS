
const express=require('express')
var router=express.Router()
const {auth}=require('../middlewares/auth')

var {getAllPosts,addPost,getOnePost,updatePost,deletePost, addReply, editReply, removeReply}=require('../controllers/posts')

//posts (ahmed hesham)
router.get('/',getAllPosts)


// router.use(auth) in case we apply authorization authentication on all methods


router.post('/',auth,addPost)


router.get('/:id',getOnePost)


router.patch('/:id',auth,updatePost)


router.delete('/:id',auth,deletePost)


//replies (essam)
router.put('/',auth, addReply)

router.patch('/',auth, editReply)

router.delete('/',auth, removeReply)


module.exports=router