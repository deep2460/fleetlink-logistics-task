import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="w-full bg-blue-600 shadow-md">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          FleetLink 
        </Link>

        {/* Center Nav */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-md font-medium text-white hover:bg-blue-400 transition"
          >
            Search & Book
          </Link>
          <Link
            to="/addvehicle"
            className="px-4 py-2 rounded-md font-medium text-white hover:bg-blue-400 transition"
          >
            Add Vehicle
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header
