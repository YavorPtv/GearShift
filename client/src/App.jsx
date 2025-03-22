import { Routes, Route } from 'react-router';

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navigation from './components/Navigation/Navigation';
import Catalog from './components/Catalog/Catalog';
import CarCreate from './components/Car-Create/CarCreate';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

export default function App() {

    return (
        <>
            <Navigation />
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path='/cars' element={<Catalog />} />
                    <Route path='/cars/create' element={<CarCreate />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            <Footer />
        </>

    )
}