const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
      type: String,
      required: true
  }
});

const User = mongoose.model('User1', userSchema);

module.exports = User;


// const updateindb= async()=>{
//     const User = mongoose.model('User1', userSchema);
//     let data= await User.updateMany(
//         {
//             email:
//             "48067@students.riphah.edu.pk" },
//         {
//             $set:{username: 'alihaider1122'},
//             $set:{ password:"1122"},
           
//         },
        
//     ) 
//     console.log(data)

// }
// updateindb()