import { useState } from 'react'
import api from '../api/api'

function SearchAndBook() {
  const [capacityRequired, setCapacityRequired] = useState('')
  const [fromPincode, setFromPincode] = useState('')
  const [toPincode, setToPincode] = useState('')
  const [startTime, setStartTime] = useState('')

  const [results, setResults] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [bookingId, setBookingId] = useState(null)

  function handleSearchChange(e) {
    const { name, value } = e.target
    if (name === 'capacityRequired') setCapacityRequired(value)
    if (name === 'fromPincode') setFromPincode(value)
    if (name === 'toPincode') setToPincode(value)
    if (name === 'startTime') setStartTime(value)
  }

  async function handleSearch(e) {
    e.preventDefault()
    setMessage('')
    setError('')
    setResults([])
    setLoading(true)

    try {
      const res = await api.get('/vehicles/available', {
        params: {
          capacityRequired,
          fromPincode,
          toPincode,
          startTime,
        },
      });
      setResults(res.data)
    } catch (err) {
      console.error(err)
      setError(' Failed to fetch vehicles')
    } finally {
      setLoading(false)
    }
  }

  async function handleBooking(vehicleId) {
    setMessage('')
    setError('')
    setBookingId(vehicleId)

    const bookingPayload = {
      vehicleId,
      fromPincode,
      toPincode,
      startTime,
      customerId: `customer-${Math.floor(Math.random() * 100000)}`, 
    };

    try {
      await api.post('/bookings', bookingPayload)
      setMessage(' Vehicle booked successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error(err)
      setError(' Booking failed or vehicle is no longer available.')
    } finally {
      setBookingId(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Search Available Vehicles</h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="number"
          name="capacityRequired"
          placeholder="Capacity Required (kg)"
          value={capacityRequired}
          onChange={handleSearchChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="fromPincode"
          placeholder="From Pincode"
          value={fromPincode}
          onChange={handleSearchChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="toPincode"
          placeholder="To Pincode"
          value={toPincode}
          onChange={handleSearchChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="datetime-local"
          name="startTime"
          value={startTime}
          onChange={handleSearchChange}
          required
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded col-span-full hover:bg-blue-700"
        >
          Search Availability
        </button>
      </form>

      {loading && <p className="text-blue-600 mb-4">🔄 Searching available vehicles...</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-600 italic">No vehicles found for given criteria.</p>
      )}

      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Capacity (kg)</th>
                <th className="py-2 px-4 text-left">Tyres</th>
                <th className="py-2 px-4 text-left">Est. Duration (hrs)</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((vehicle) => (
                <tr key={vehicle._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{vehicle.name}</td>
                  <td className="py-2 px-4">{vehicle.capacityKg}</td>
                  <td className="py-2 px-4">{vehicle.tyres}</td>
                  <td className="py-2 px-4">{vehicle.estimatedRideDurationHours}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                      onClick={() => handleBooking(vehicle._id)}
                      disabled={bookingId === vehicle._id}
                    >
                      {bookingId === vehicle._id ? 'Booking...' : 'Book Now'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SearchAndBook;
