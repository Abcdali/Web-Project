const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
});
const Sign_in = mongoose.model('Sign_in', userSchema);
module.exports= Sign_in;