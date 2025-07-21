import { useState } from 'react'
import api from '../api/api'

function AddVehicle() {
  const [name, setName] = useState('')
  const [capacityKg, setCapacityKg] = useState('')
  const [tyres, setTyres] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    console.log('🚚 Submitting Vehicle:', { name, capacityKg, tyres })

    try {
      const res = await api.post('/vehicles', {
        name,
        capacityKg: parseInt(capacityKg),
        tyres: parseInt(tyres),
      });

      console.log(' Response:', res.data);
      setMessage(' Vehicle added successfully!')

      // Reset all fields
      setName('');
      setCapacityKg('');
      setTyres('');
    } catch (err) {
      console.error(' Error:', err);
      setError('Failed to add vehicle. Check input or server.')
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add New Vehicle</h2>

        {message && <p className="mb-4 text-green-600 text-sm">{message}</p>}
        {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Vehicle Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Capacity (KG)</label>
            <input
              type="number"
              value={capacityKg}
              onChange={(e) => setCapacityKg(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Number of Tyres</label>
            <input
              type="number"
              value={tyres}
              onChange={(e) => setTyres(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
