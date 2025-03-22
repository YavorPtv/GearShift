import { Routes, Route } from 'react-router';

import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navigation from './components/Navigation/Navigation';
import Catalog from './components/Catalog/Catalog';
import CarCreate from './components/Car-Create/CarCreate';

export default function App() {

    return (
        <>
            <Navigation />
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path='/cars' element={<Catalog />} />
                    <Route path='/cars/create' element={<CarCreate />} />
                </Routes>
            <Footer />
        </>

    )
}