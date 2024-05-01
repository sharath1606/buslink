var express = require('express');
var router = express.Router();

const BusTicket = require('../helpers/ticket-booking');
const Location = require('../helpers/map-helpers');
/* GET admin dashboard. */
router.get('/add-location', function(req, res, next) {
  // Render the admin dashboard view
  res.render('admin/add-location', { admin: true }); 
});

router.post('/admin/add-location', async function(req, res, next) {
  
  try {
    // Extract latitude, longitude, and accuracy from the request body
    const { latitude, longitude, accuracy } = req.body;

    // Create a new Location instance with the provided data
    const newLocation = new Location({
      latitude,
      longitude,
      accuracy
    });

    // Save the new location to the database
    await newLocation.save();

    // Send a success response
    res.status(201).send('Location added successfully.');
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send('An error occurred while adding the location.');
  }
});


router.get('/bustickets', async function(req, res, next) {
  try {
    // Retrieve all products from the database
    const tickets = await BusTicket.find().exec();
    const data_source=tickets.map(ticket =>{
      return{
        source: ticket.source,
        destination: ticket.destination,
        date:ticket.date,
        bookingDate:ticket.bookingDate,
        numberOfPassengers:ticket.numberOfPassengers,
      }
    })
    console.log(tickets);

    // Render the view-products template with the retrieved products
    res.render('admin/bustickets', { admin: true, tickets:tickets,data:data_source});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
