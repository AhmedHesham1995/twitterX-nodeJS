const mongoose=require('mongoose')
const { Schema } = mongoose;

//posts (ahmed hesham) -- replies (essam)
const postsSchema=mongoose.Schema({
    title:{
        type: String,
        minLength: 5,
        maxLength: 1000,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    updated: Date,
    replies: [
        {
            text: String,
            created: {type: Date, default: Date.now},
            postedBy: {type: Schema.Types.ObjectId, ref: 'User'}
        }
    ]
    },{timestamps:true})

var postsModel=mongoose.model('Post',postsSchema)

module.exports=postsModel