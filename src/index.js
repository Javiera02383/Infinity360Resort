/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "./views/Index.js";
import Login from "views/Login.js";
import Profile from "views/Profile.js";
import Register from "views/Register.js";

import Rooms from "./views/Rooms.js";
import Restaurant from './/views/Restaurant.js';
import Booking from './/views/Booking.js';
import Factura from './/views/Factura.js';
import Services from './/views/Services.js';
import RoomDetails from './/views/RoomDetails.js';
import Manual from './/views/Manual.js';


// *********************************************************************

// *********************************************************************


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Index />} /> 
      <Route path="/login-page" exact element={<Login />} />
      <Route path="/profile-page" exact element={<Profile />} />
      <Route path="/register-page" exact element={<Register />} />
      <Route path="/rooms-page" exact element={<Rooms />} />
      <Route path="/booking-page" exact element={<Booking />} />
      <Route path="/factura-page" exact element={<Factura />} />
      <Route path="/restaurant-page" exact element={<Restaurant />} />
      <Route path="/services-page" exact element={<Services />} />
      <Route path="/roomDetails-page" exact element={<RoomDetails />} />
      <Route path="/manual-page" exact element={<Manual />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
