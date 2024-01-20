import {useState, useEffect, useReducer} from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHelmetSafety, faHammer } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom";


const Booking = () => {

  const {propertyId} = useParams();

    const reducedBookingsList = (state, action) => {
      //reduced properties list function used in useReducer
      switch (action.type) {
        case "SET": 
          return action.payload;
                  //returns the state as is 
        default:
          return state; 
      }
    };

    const [listOfBookings, dispatch] = useReducer(reducedBookingsList, []);
    
    //JWT token used for authentication
    const token = sessionStorage.getItem("jwt");

  useEffect(() => {
 
    fetch("https://localhost:7091/Booking")
      .then((response) => {
        if (!response.ok) {
          alert("Error occurred, could not load data of bookings");
          throw response.status;
          //GET request to get all the bookings and set this into state
        }
        return response.json();
      })
      .then((listOfBookings) => {
        dispatch({ type: "SET", payload: listOfBookings });
        //using a type of SET and the payload of all the bookings.
       
      })
      .catch((error) => {
        console.log(error);
        alert("Error has occurred getting the data");
      });
  }, []);





  return <>
  <br />
  <br />
  <br />
  <h1 className="display-1">Bookings Page</h1>
  <br />
  <div><h2 className="display-2">coming soon <FontAwesomeIcon icon={faHelmetSafety} />&nbsp;<FontAwesomeIcon icon={faHammer} /></h2></div>
  
  <br />
  <br />

  <div className="container-fluid">
        <div className="row justify-content-center">
        <div className="col-lg-7">
        <table  class="table table-hover table-bordered">
          <thead >
            <tr >
              <th scope="col">Buyer</th>
              <th scope="col">Property</th>
              <th scope="col">Date/Time</th>
              
             
            </tr>
          </thead>
          <tbody>
             {

              propertyId == null ? 

              listOfBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.buyerId}</td>
                  <td>{booking.propertyId}</td>
                  <td>{booking.time}</td>
                </tr>
              )) : listOfBookings.filter(b => b.propertyId == propertyId).map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.buyerId}</td>
                  <td>{booking.propertyId}</td>
                  <td>{booking.time}</td>
                </tr>
              ))
              }
            
          </tbody>
        </table>
        </div>
      </div>  
      </div>
       
  <br />
  <br />
  <br />
  <br />
  <br />
  
  
  </>;
};

export default Booking;
