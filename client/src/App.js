import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navbr from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Userprofile from "./pages/user/Userprofile";
import ChangeCredentials from "./pages/user/ChangeCredentials";
import UpdateUser from "./pages/user/UpdateUser";
import Dashbaord from "./pages/user/Dashboard";
import AddClinic from "./pages/health-center/Add-clinic";
import AddRating from "./pages/health-center/Add-rating";
import ClinicForm from "./pages/health-center/ClinicForm";
import YourRatings from "./pages/user/YourRatings";
function App() {
  return (
    <div className="App">
      <header>
        <Router>
          <Navbr />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/Userprofile" element={<Userprofile />}></Route>
            <Route path="/yourratings" element={<YourRatings />}></Route>
            <Route
              path="/changecredentials"
              element={<ChangeCredentials />}
            ></Route>
            <Route path="/updateuser" element={<UpdateUser />}></Route>
            <Route path="/dashboard" element={<Dashbaord />}></Route>
            <Route path="/addclinic" element={<AddClinic />}></Route>
            <Route path="/addrating/:resultId" element={<AddRating />} />
            <Route path="/clinicform/:resultId" element={<ClinicForm />} />
          </Routes>
          <Footer />
        </Router>
      </header>
    </div>
  );
}

export default App;
