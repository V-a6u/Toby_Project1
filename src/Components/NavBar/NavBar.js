import { Link, Outlet} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHouseUser, faUser,faHouseFlag, faChessRook, faChessBoard, faAddressBook, faSignIn, faSignOut} from "@fortawesome/free-solid-svg-icons"
import { faChessKnight} from "@fortawesome/free-regular-svg-icons"
import { useState } from "react";
import Login from "../Login/Login";
import { getValue } from "@testing-library/user-event/dist/utils";
const NavBar = () => {
 //JWT token used for authentication
 const token = sessionStorage.getItem("jwt");
  
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-body-tertiary">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <Link to="/home" className="navbar-brand fw-bold text-black">
              &nbsp;<FontAwesomeIcon icon={faChessRook} /> <FontAwesomeIcon icon={faChessBoard} /> 
            </Link>

            {
              token && (
                <Link to="/logout" className="navbar-brand fw-bold text-black">
              &nbsp;
            </Link>
              )
            }  
          </div>
          <div className="navbar-nav ms-auto text-dark">
            <Link to="/property" className="nav-item fw-bold nav-link text-dark">
            <FontAwesomeIcon icon={faHouse}  />&nbsp;Properties 
            </Link>
            <Link to="/seller" className="nav-item nav-link fw-bold text-black">
            <FontAwesomeIcon icon={faHouseFlag}  />&nbsp;Seller 
            </Link>
            <Link to="/buyer" className="nav-item nav-link fw-bold text-black">
            <FontAwesomeIcon icon={faHouseUser}  />&nbsp;Buyers 
            </Link>
            <Link to="/booking" className="nav-item nav-link fw-bold text-black">
            <FontAwesomeIcon icon={faAddressBook}  />&nbsp;Bookings 
            </Link>
          </div>
        </div>
      </nav>
      <div className="container">
                <Outlet/>
            </div>
      <div className="mt-5"></div>
    </>
  );
};

export default NavBar;
