const mongoose=require("mongoose")
const bcrypt=require('bcryptjs')

const usersSchema=mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength:6
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minLength:3
    },
    firstName:{
        type: String,
        required: true,
        minLength:3,
        maxLength:15
    },
    lastName:{
        type: String,
        required: true,
        minLength:3,
        maxLength:15
    },
    location:{
        type: String
    },
    bio:{
        type: String
    },
    profilePicture:{
        type: String
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    dob:Date},{timestamps:true})


    usersSchema.pre("save",async function(next){
        console.log(this);

        var salt=await bcrypt.genSalt(10)
        var hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
        next()
    })

const usersModel=mongoose.model("User",usersSchema)

module.exports=usersModel