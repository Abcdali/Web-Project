require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./user23');
const Use=require('./add');
const Payment = require('./pays'); 
const Sign_in = require('./sign-in');
// const User = require('./add');

// const Menu = require('./order');



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use("E:/Node/Web_programming/MyWeb/public/images",express.static("images"));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MONGO CONNECTION OPEN!!!"))
    .catch(err => console.log("OH NO MONGO CONNECTION ERROR!!!!", err));

    app.post('/Sign_up', async (req, res) => {
        const { name, username, email, tel, password, cpassword } = req.body;
    
    
        if (!name || !username || !email || !tel || !password || !cpassword) {
            return res.render('Sign_up', { message: 'All fields are required' });
        }
    
        if (password !== cpassword) {
            return res.render('Sign_up', { message: 'Passwords do not match' });
        }
    
        try {
            const newUser = new User({
                name,
                username,
                email,
                tel,
                password,
                cpassword
            });
    
            await newUser.save();
            res.render('Home2', { message: 'Account created successfully'  });
        } catch (error) {
            console.error(error);
            res.render('Sign_up', { message: 'Error creating account' });
        }
    });
    
    

    app.post('/payment', async (req, res) => {
        const { name, email, address, city, state, zip_code, card, credit,date,  cvv } = req.body;
    
    
        if (!name || !email || !address || !city || !state || !zip_code || !card || !credit ||!date || !cvv) {
            return res.render('Payment', { message: 'All fields are required' });
        }
    
        try {
            
            const newPayment = new Payment({
                name,
                email,
                address,
                city,
                state,
                zip_code,
                card,
                credit,
                date,
                cvv
            });
            await newPayment.save();
            res.render('payment', { message: 'Payment processed successfully', success: true });
        } catch (error) {
            console.error(error);
            res.render('Payment', { message: 'Error processing payment', success: false });
        }
        
    });
 
    app.post('/Sign_in', async (req, res) =>{
        const { username,password } = req.body;
        if (!username || !password) {
            return res.render('Sign_up', { message: 'All fields are required' });
        }
    
        try {
            const exist = new Sign_in({
              username,
              password
            });
            await exist.save();
            res.render('Home2', { message: 'login successfull', success: true });
        } catch (error) {
            console.error(error);
            res.render('sign_in', { message: 'Error Login', error: false });
        }
    });
    const favoriteSchema = new mongoose.Schema({
        menu_name: String,
        menu_quantity: Number,
        total_price: Number
    });
    
    const Favorite = mongoose.model('order', favoriteSchema);
    module.exports=Favorite;

    // const deleteindb=async()=>{
    //     const Favorite = mongoose.model('order', favoriteSchema);
    //      await Favorite.deleteOne(
    //         { menu_quantity:2}
    //     )
    // }
    // deleteindb()


// const updateindb=async()=>{
//     const Favorite=mongoose.model('order',favoriteSchema);
//     let data= await Favorite.updateMany(
//         {menu_name: 'Meat Lovers Pizza'},
//         {
//             $set:{menu_quantity:5}
//         },
        
//     )
//     console.log(data);
// }
// updateindb()

// const insertindb=async()=>{
//     const Favorite=mongoose.model('order',favoriteSchema);
//     let data=await Favorite.insertMany(
//         [
//             {
//                 menu_name: 'rr ',
//                 menu_quantity:2,
//                 total_price:40
//             }
//         ]
//     )
// }
// insertindb()

// const findindb=async()=>{
//     const Favorite=mongoose.model('order',favoriteSchema);
//     let data=await Favorite.find(
        
        
//     )
//     console.log(data);
// }
// findindb()



    app.use(bodyParser.json());
    app.use(express.static('public'));
    
    app.post('/save-favorite', (req, res) => {
        const { menu_name, menu_quantity, total_price } = req.body;
    
        const favorite = new Favorite({
            menu_name,
            menu_quantity,
            total_price
        });
    
        favorite.save()
            .then(() => res.send('Favorite menu saved successfully!'))
            .catch(error => res.status(500).send('Error saving favorite menu: ' + error));
    });
    
 



    app.get('/get-orders', (req, res) => {
        Favorite.find({})
            .sort({ created_at: -1 }) 
            .exec()
            .then(favorites => {
                res.json(favorites);
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
                res.status(500).send('Error fetching orders');
            });
    }); 

app.get('/signup',async(req,res)=>{
    const pay=await User.find({});
    console.log(pay);
    res.render('add1',{pay});
})
app.get('/signin',async(req,res)=>{
    const users = await Sign_in.find({}); // Fetch all user records from the database
        console.log(users); // Log the fetched data to see if it’s an array
        res.render('Signin', { Sign_in: users }); 
})
app.get('/add', async (req, res) => {
    const Favorites = await Favorite.find({});
    console.log(Favorites);
    res.render("add", { Favorites });
});
app.get('/user-data', async (req, res) => {
    const users = await User.find({});
    console.log(users);
    res.render("sign", {users });
});
app.get('/pymt', async (req, res) => {
    const Payments = await Payment.find({});
    console.log(Payments);
    res.render("Pay", {Payments });
});
app.get('/wishEat', (req, res) => {
    const {message} = req.query;
    res.render("Home1", { message });
});
app.get('/Sign_in', (req, res) => {
    const {message} = req.query;
    res.render("Sign_in", { message  });
});
app.get('/Sign_up', (req, res) => {
    const {message} = req.query;
    res.render("Sign_up", { message });
});
app.get('/Home2', (req, res) => {
    const {message} = req.query;
    res.render("Home2", { message });
});
app.get('/payment', (req, res) => {
    const {message} = req.query;
    res.render("Payment", { message });
});
app.get('/admin',(req,res)=>{
    const {message}=req.query;
    res.render("admin",{message});
})
// Start the server
app.listen(3000, () => {
    console.log("server is listening at 3000");
});