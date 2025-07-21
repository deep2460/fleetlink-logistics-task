const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const vehicleRoutes = require('./routes/vehicleRoutes')
const bookingRoutes = require('./routes/bookingRoutes')



const MONGODB_URI = process.env.MONGODB_URI
//console.log(MONGODB_URI)
const PORT = process.env.PORT || 3000


async function startServer() {
  try {
    await mongoose.connect(`${MONGODB_URI}/fleetlinkproject`, {
    });

    console.log(' MongoDB connected');  
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    })

  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1)
  }
}

startServer();


app.use(cors())
app.use(express.json())
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/bookings', bookingRoutes)


