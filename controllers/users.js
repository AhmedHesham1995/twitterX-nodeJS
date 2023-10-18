const usersModel=require('../models/users')
const postsModel=require('../models/posts')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const getAllUsers=async(req,res)=>{
    try{
        let users=await usersModel.find({},'firstName -_id')
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({message:"something went wrong"})

    }
}
    
const addUser=async(req,res)=>{
    var user=req.body
    try{
        const newuser=await usersModel.create(user)
        res.status(201).json({message:"added successfully",data:newuser})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }

}

const getOneUser=async(req,res)=>{
    let userId=req.params.id
    try{
        let wanted=await usersModel.find({_id:userId})
        if(wanted) res.status(200).json(wanted)
        else res.status(404).json({message: "Not exist"})
    }
    catch(err){
        res.json({message: message.err})
    }
}

const updateUser=async(req,res)=>{
    var user=req.body
    let userId=req.params.id
    // let newEmail=req.body.email
    // let newPass=req.body.password
    // let newUser=req.body.username
    // let newFirstName=req.body.firstName
    // let newLastName=req.body.lastName

    let{username,email,firstName,lastName,password}=user
    try{
        const queryRes=await usersModel.updateOne({_id:userId},{email,password,username,firstName,lastName})
        

        console.log(queryRes);
        res.status(200).json({message: "edited success",data:user})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}



  

const deleteUser=async(req,res)=>{
    let userId=req.params.id
    try{
        await usersModel.deleteOne({_id:userId})
        res.status(200).json({message: "deleted success"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}



const posts4specificUser=async(req,res)=>{
    let user=req.params.id
    console.log(user);
    try{
        let wanted=await postsModel.find({userId:user})
        if(wanted.length) {
            res.status(200).json(wanted)
            console.log(wanted);
        }
        else res.status(404).json({message: "This user hadn't posted never"})
    }
    catch(err){
        res.status(500).json({message: message.err})
    }
}



//authentication
async function login(req,res){
    const {email,password,role}=req.body
    if(!email || !password){
        return res.status(400).json({message:"you must provide email and password"})
    }

    const user=await usersModel.findOne({email:email})
    if(!user){
        return res.status(404).json({message:"invalid email or password"})
    }

    const isValid=await bcrypt.compare(password,user.password)
    if(!isValid){
        return res.status(401).json({message:"invalid password"})
    }


    //generate token
    const token=jwt.sign({id:user._id,name:user.username},process.env.SECRET,{expiresIn:"1h"})
    res.status(200).json({token:token})
}

module.exports={getAllUsers,addUser,getOneUser,updateUser,deleteUser,login,posts4specificUser}