const Booking = require('../models/Booking')
const mongoose = require('mongoose')



const createBooking = async (req, res) => {
    //console.log(req.body)
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body

    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
     return res.status(400).json({ error: 'Invalid vehicleId format' })
    }

    const estimatedRideDurationHours =
      Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24

    const start = new Date(startTime);
    const end = new Date(start.getTime() + estimatedRideDurationHours * 3600000)

    const newBooking = new Booking({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (err) {
    //console.error(' Error creating booking:', err)
    res.status(500).json({ error: 'Server error' })
  }
};

module.exports = {
     createBooking 
    };
