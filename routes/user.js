var express = require('express');
var router = express.Router();
const User = require('../helpers/signup-helpers');
const BusTicket = require('../helpers/ticket-booking');
const bcrypt = require('bcrypt');
const { response } = require('../app');
const qrcode = require('qrcode');
const Location = require('../helpers/map-helpers');


/* GET home page. */
router.get('/', function(req, res, next) {
    let user = req.session.user;
    console.log(user); // Log the user object
    res.render('user/index', { admin: false, user });
});



 
   router.get('/trackbus', async (req, res) => {
    try {
        // Retrieve coordinates from the database (assuming you're using Mongoose)
        const coordinates = await Location.findOne(); // Adjust this query as needed
        
        // Respond with the coordinates as JSON
        res.json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).send('Internal Server Error');
    }
});
    
    router.get('/booking-success', function(req, res, next) {

 
      res.render('user/booking-success', {admin:false});
      });
    router.get('/bookbus', function(req, res, next) {
        // Render the "user/bookbus" view with the specified content
        res.render('user/bookbus', { admin: false });
    });
    router.get('/searchbus', function(req, res, next) {
      // Render the "user/searchbus" view with the specified content
      res.render('user/searchbus', { admin: false });
  });
  
    router.post('/bookbus', async (req, res) => {
      try {
          // Create a new BusTicket instance using the data from the request body
          const newTicket = new BusTicket({
              source: req.body.source,
              destination: req.body.destination,
              date: req.body.date,
              numberOfPassengers: req.body.passengers
          });
  
          // Save the new bus ticket to the database
          const savedTicket = await newTicket.save();
          console.log(savedTicket);
          const qrCodeData = JSON.stringify({
            source: req.body.source,
            destination: req.body.destination,
            date: req.body.date,
            passengers: req.body.passengers
        });
        qrcode.toDataURL(qrCodeData, (err, qrCodeUrl) => {
        if (err) {
              console.error('Error generating QR code:', err);
              res.status(500).send('Internal Server Error');
          } else {
              
              res.render('user/booking-success', { admin:false,qrCodeUrl });
          }
      });
          // Redirect the user to a success page or any other appropriate route
          // res.redirect('/booking-success');
      } catch (error) {
          console.error("Error in booking bus ticket:", error);
          res.redirect('/error'); // Redirect to an error page if there's an error
      }
  });
router.get('/login', function(req, res, next) {

 
    res.render('user/login', {admin:false});
    });
    router.get('/signup', function(req, res, next) {

 
     res.render('user/signup', {admin:false});
      });
        router.post('/signup',async (req, res) => {
            console.log(req)
            try {
              const newItem = new User({
                name: req.body.name,
                email: req.body.email,
              });
          
              newItem.password = await bcrypt.hash(req.body.password,10);
          
              const savedItem = await newItem.save();
              console.log(savedItem)
             
              res.redirect('/')
            } catch (error) {
              console.log("Signup Error", error);

            }
          });
          
          
        

          router.post('/login',async(req,res)=>{
            const { email, password } = req.body;
          
            try {
              const user = await User.findOne({ email });
          
          
          
              if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    console.log('user and password correct');
                    req.session.loggedIn = true;
                   
                    req.session.user = user; // corrected variable name
                    res.redirect('/user');
                }
                
          
              else if (!isPasswordValid) {
                console.log('invalid password')
                res.redirect('/')
              }
              }
          
              if(!user){
                console.log('user not found')
                res.redirect('/')
              }
          
            } catch (error) {
              console.error(error);
              console.log(error)
            }
          });
          
          /*user page */
          router.get('/user', function(req, res, next){
          
            res.render('user/index',{signupage:true});
          });
          
          
          
          
          module.exports = router;


