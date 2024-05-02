var express = require('express');
var router = express.Router();
const User = require('../helpers/signup-helpers');
const BusTicket = require('../helpers/ticket-booking');
const bcrypt = require('bcrypt');
const { response } = require('../app');
const qrcode = require('qrcode');
const Location = require('../helpers/map-helpers');
const Feedback = require('../helpers/feedback-helper');



/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.loggedIn=true;
  console.log(req.session.user);
  
    
    // Log the user object
    res.render('user/index', { user: req.session.user });
});



 
router.get('/trackbus', async (req, res) => {
  try {
      // Retrieve coordinates from the database (assuming you're using Mongoose)
      const coordinates = await Location.find().exec();

      // Transform coordinates data to include only latitude, longitude, and accuracy
      const markersData = coordinates.map(co => ({
          lat: co.latitude,
          lng: co.longitude,
          popupText: `Accuracy: ${co.accuracy}`
      }));

      // Render a webpage and pass the coordinates data to it
      res.render('user/trackbus', { markersData: JSON.stringify(markersData) });
  } catch (error) {
      console.error('Error fetching coordinates:', error);
      res.status(500).send('Internal Server Error');
  }
});

    
    router.get('/booking-success', function(req, res, next) {

      req.session.loggedIn=true;
      res.render('user/booking-success', {admin:false,user:req.session.user});
      });
      router.get('/feedback', function(req, res, next) {
        req.session.loggedIn=true;
 
        res.render('user/feedback', {admin:false,user: req.session.user});
        });
    router.get('/bookbus', function(req, res, next) {
      req.session.loggedIn=true;
        // Render the "user/bookbus" view with the specified content
        res.render('user/bookbus', { admin: false,user:req.session.user });
    });
    router.get('/showbus', function(req, res, next) {
      req.session.loggedIn=true;
      res.render('user/showbus', { admin: false });
  });
    router.get('/searchbus', function(req, res, next) {
      req.session.loggedIn=true;
      // Render the "user/searchbus" view with the specified content
      res.render('user/searchbus', { admin: false ,user:req.session.user});
  });
  router.post('/searchbus', (req, res) => {
    const startingLocation = req.body.startingLocation;
    const destination = req.body.destination;

    // Logic to determine the appropriate page based on startingLocation and destination
    // Set the default URL
    
    if (startingLocation === "Thrissur" && destination === "cherthuruthy") {
        redirectUrl = "showbus"; // Redirect to the specific page
    } else if (startingLocation === "Mumbai(All locations)" && destination === "Bangalore(All locations)") {
        redirectUrl = "/mumbai_to_bangalore"; // Redirect to the specific page
    } else {
        redirectUrl = "/no_route_available"; // Redirect to a page indicating no route available
    }

    res.redirect(redirectUrl);
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
             
              res.redirect('/login')
            } catch (error) {
              console.log("Signup Error", error);

            }
          });
          
          
        

          router.post('/login', async (req, res) => {
            const { email, password } = req.body;
        
            try {
                const user = await User.findOne({ email });
        
                if (user) {
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    
                    if (isPasswordValid) {
                        req.session.loggedIn = true;
                        req.session.user = user;
                        // Redirect to user dashboard and pass user's name
                        return res.redirect('/');
                    } else {
                        console.log('Invalid password');
                        return res.redirect('/');
                    }
                } else {
                    console.log('User not found');
                    return res.redirect('/');
                }
            } catch (error) {
                console.error('Error during login:', error);
                return res.status(500).send('Internal Server Error');
            }
        });
        
          
          /*user page */
          router.get('/user', function(req, res, next){
          
            res.render('user/index',{signupage:true});
          });
          
         
// Route for receiving feedback via GET request
router.post('/feedback', async (req, res) => {
  try {
    // Get feedback from request body
    const { feedback } = req.body;

    // Create a new Feedback instance
    const newFeedback = new Feedback({
      feedback: feedback
    });

    // Save the feedback to MongoDB
    await newFeedback.save();
     res.render('user/index',{signupage:true});

    // Send a success response
   
  } catch (error) {
    // Send an error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Export the router
module.exports = router;
          
          
          module.exports = router;


