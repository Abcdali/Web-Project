const mongoose = require('mongoose');
const newpaymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip_code: {
        type: String,
        required: true
    },
    card: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    }
});

const Payment = mongoose.model('Payment', newpaymentSchema);
module.exports = Payment;

// const updateindb=async()=>{
//     const Payment = mongoose.model('Payment', newpaymentSchema);
//     let data= await Payment.updateMany(
//         {name: 'Ali Haider'},
//         {
//             $set:{city: 'isb',state: 'Sin'}
//         },
//         {credit: 12345678},
//         {
//             $set:{name: 'Ali', zip_code: 34000 }
//         }

//     )
// }
// updateindb()

// const deleteindb = async()=>{
//     const Payment = mongoose.model('Payment', newpaymentSchema);
//     let data= await Payment.deleteOne(
//         {credit:4},
//     )
// }
// deleteindb()

// const find=async()=>{
//  const Payment = mongoose.model('Payment',newpaymentSchema);
// let data= await Payment.find({cvv: 12345});
// console.log(data);
// }
// find()

// const  insert=async()=>{
//     const Payment= mongoose.model('Payment', newpaymentSchema);
//     let data= await Payment.insertMany([
      
//         {
//         name: 'AAA',
//         email: 'ali@12345gmail.com',
//         address: 'dhuiehfjb2j3ui4h',
//         city: 'Lahore',
//         state: 'si',
//         zip_code:50000,
//         credit:12390,
//         card: 'Ah',
//         date:12/2/23,
//         cvv: 1122
//         }
        

        
//     ])
//     console.log(data);
// }
// insert()






