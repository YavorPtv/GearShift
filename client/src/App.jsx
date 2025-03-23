import { Routes, Route } from 'react-router';

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navigation from './components/Navigation/Navigation';
import CarCatalog from './components/CarCatalog/CarCatalog';
import CarCreate from './components/Car-Create/CarCreate';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { UserProvider } from './providers/UserProvider';
import Logout from './components/Logout/Logout';
import CarDetails from './components/Car-Details/CarDetails';

export default function App() {

    return (
        <UserProvider>
            <Navigation />
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path='/cars' element={<CarCatalog />} />
                    <Route path='/cars/create' element={<CarCreate />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/cars/:carId/details' element={<CarDetails />} />
                </Routes>
            <Footer />
        </UserProvider>

    )
}