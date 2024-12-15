import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/createListing';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import Listing from './pages/listing';
import Modal from './pages/modal'; 
import Produits from './pages/Produits';
import Durabilite from './pages/durabilite';
import Expertise from './pages/expertise';
import Spiruline from './pages/microalgues/spiruline'; 
import Astaxanthyne from './pages/microalgues/astaxanthyne';
import Dunaliella from './pages/microalgues/dunaliella';
import Phycocyanine from './pages/microalgues/phycocyanine';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/Produits' element={<Produits />} />
        <Route path='/durabilite' element={<Durabilite />} />
        <Route path='/expertise' element={<Expertise />} />
        <Route path="/microalgues/spiruline" element={<Spiruline />} />
        <Route path="/microalgues/astaxanthyne" element={<Astaxanthyne/>} />
        <Route path="/microalgues/dunaliella" element={<Dunaliella/>} />
        <Route path="/microalgues/phycocyanine" element={<Phycocyanine/>} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/modal' element={<Modal />} />
          <Route path="/listing/:id" element={<Listing />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path='/create-listing' element={<CreateListing />} />
            
           
          </Route>
      </Routes>
    </BrowserRouter>
  );
}