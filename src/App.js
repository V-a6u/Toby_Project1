import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Property from "./Components/Property/Property";
import Buyer from "./Components/Buyer/Buyer";
import Seller from "./Components/Seller/Seller";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Booking from "./Components/Booking/Booking";
import SellerProperties from "./Components/Seller/SellerProperties";
import Login from "./Components/Login/Login";

function App() {
  return (
      <BrowserRouter>
      <NavBar/>
          <Routes>
              <Route index element = {<Home/>}/>
              <Route path="home" element={<Home/>}></Route>
              <Route path="property" element={<Property/>}></Route>
              <Route path="buyer" element={<Buyer/>}></Route>
              <Route path="seller" element={<Seller/>}></Route>
              <Route path="booking" element={<Booking/>}></Route>
              <Route path="booking/:propertyId" element={<Booking/>}></Route>
              <Route path="seller/:sellerId/properties" element={<SellerProperties/>} />
              <Route path="login" element={<Login />} />
          </Routes>
          <Footer />
      </BrowserRouter>

   );
}
export default App;
