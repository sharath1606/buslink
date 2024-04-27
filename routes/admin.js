var express = require('express');
var router = express.Router();
const Bus = require('../helpers/map-helpers'); // Import the Bus model
const BusTicket = require('../helpers/ticket-booking');
/* GET admin dashboard. */
router.get('/', function(req, res, next) {
  // Render the admin dashboard view
  res.render('admin/add-location', { admin: true }); // Assuming you have an admin/index view
});

/* GET form to add new bus location. */
router.get('/add-location', function(req, res, next) {
  // Render the form to add new bus location
  res.render('admin/add-location');
});

//* POST route to add new bus location. */
router.post('/add-location', async function(req, res, next) {
  try {
    // Extract data from the request body
    const { name, latitude, longitude, route } = req.body;

    // Create a new Bus instance with the provided data
    const newBus = new Bus({
      name,
      latitude,
      longitude,
      route
    });

    // Save the new bus location to the database
    await newBus.save();

    // After saving, fetch all bus locations from the database
    const allBusLocations = await Bus.find({});

    // Send all bus locations to the client
    res.render('admin/add-location', { admin: true, busLocations: allBusLocations });

    // Alternatively, you can redirect to a route that displays the map with the updated bus locations
    // res.redirect('/map');

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
