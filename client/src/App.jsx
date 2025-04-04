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
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import CarEdit from './components/Car-Edit/CarEdit';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import { ToastContainer } from 'react-toastify'
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import AboutUs from './components/AboutUs/AboutUs';

export default function App() {

    return (
        <UserProvider>
            <ScrollToTop />
            <Navigation />
            <Routes>
                <Route index element={<Home />} />
                <Route path='/cars' element={<CarCatalog />} />
                <Route path='/cars/:carId/details' element={<CarDetails />} />
                <Route path='/about' element={<AboutUs />} />

                <Route element={<AuthGuard />}>
                    <Route path='/cars/create' element={<CarCreate />} />
                    <Route path='/cars/:carId/edit' element={<CarEdit />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>

                <Route element={<GuestGuard />}>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
            <Footer />
        </UserProvider>

    )
}