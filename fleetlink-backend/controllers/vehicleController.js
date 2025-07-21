const Vehicle = require('../models/Vehicle')
const Booking = require('../models/Booking')


const addVehicle = async (req, res) => {
    //console.log(req.body)
  try {
    const { name, capacityKg, tyres } = req.body

    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const vehicle = new Vehicle({ name, capacityKg, tyres })
    //console.log(vehicle)
    await vehicle.save();

    res.status(201).json(vehicle)
  } catch (err) {
    console.error('Error adding vehicle:', err)
    res.status(500).json({ error: 'Server error' })
  }
};






const getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query

    //console.log(' Query Params:', req.query)

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ error: 'Missing query parameters' })
    }

    const estimatedRideDurationHours =
      Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24

    const start = new Date(startTime);
    if (isNaN(start)) {
      return res.status(400).json({ error: 'Invalid startTime format' })
    }

    const end = new Date(start.getTime() + estimatedRideDurationHours * 60*60*1000)
    const matchingVehicles = await Vehicle.find({
      capacityKg: { $gte: parseInt(capacityRequired) },
    });

    const availableVehicles = [];

    for (const vehicle of matchingVehicles) {
      const hasConflict = await Booking.exists({
        vehicleId: vehicle._id,
        startTime: { $lt: end },
        endTime: { $gt: start },
      });

      if (!hasConflict) {
        availableVehicles.push({
          ...vehicle.toObject(),
          estimatedRideDurationHours,
        });
      }
    }

    res.status(200).json(availableVehicles);
  } catch (err) {
    //console.error(' Error in getAvailableVehicles:', err)
    res.status(500).json({ error: 'Server error' })
  }
};


module.exports = {
  addVehicle,
  getAvailableVehicles
};
