import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AddVehicle from "./pages/AddVehicle"
import SearchAndBook from "./pages/SearchAndBook"
import Header from './components/Header.jsx'

function App() {
  return (
    <Router>
       <Header />
       <div className="min-h-screen bg-gray-100">
        

        <Routes>
          <Route path="/" element={<SearchAndBook />} />
          <Route path="/addvehicle" element={<AddVehicle />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router> 

   // <h1 className="text-4xl text-blue-600 font-bold">Tailwind Test</h1>
  )
}

export default App