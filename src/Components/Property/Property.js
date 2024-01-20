import React, { useEffect, useState, useReducer } from "react";
import {Link, useNavigate} from "react-router-dom"
import PropertySearchForm from "./PropertySearchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropertyAddForm from "./PropertyAddForm";
import PropertyEditForm from "./PropertyEditForm";
import {
  faTrash,
  faBed,
  faTree,
  faHouseChimney,
  faMapPin,
  faMinus,
  faPlus,
  faMagnifyingGlass,
  faPenToSquare,
  faCoins,
  faXmark,
  faHouseFlag,
  faBookOpen,
  faBath
} from "@fortawesome/free-solid-svg-icons";


const Property = () => {

  const naviagte = useNavigate();


  const reducedPropertiesList = (state, action) => {
    //reduced properties list function used in useReducer
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
              //if the action type is set to add then the new state will be add to the list of properties and state updated
      case "SET": 
        return action.payload;
                //returns the state as is 
      case "REMOVE":
        return state.filter((property) => property.id !== action.payload.id);
                //used for delete that filters the current state, if the given propertiesid matched that of the property id contained within the buyer then the property will be removed
      default:
        return state; 
    }
  };

  const [listOfProperties, dispatch] = useReducer(reducedPropertiesList, []);
  //creates 2 varibales of listOfProperties and dispatch. Using useReducer hook to handle state. Takes 2 arguments of the reducer function ie reducedPropertiesList and intial state of an empty array
  // as above reducedPropertiesList is a function which manipulates the state in response to different actions
  const [showPropertyInputForm, setShowPropertyInputForm] = useState(false);
    //state for showing and hiding the property input form used below 
  const [showPropertySearchForm, setShowPropertySearchForm] = useState(false);
  //state for showing and hiding the property sreach form used below 
  const [showPropertyEditForm, setShowPropertyEditForm] = useState(false);
  //state for showing and hiding the property edit form used below 
  const [searchResult, setSearchResult] = useState([]);
  //used for the filer to set the state of the filter function to display certian properties given certian conditions
  const [editedProperty, setEditedProperty] = useState(null);
  //intilises the state of edited property to start as empty this can then be used in the function below and the editPopertyForm component via pass down. 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  //both of these above used for state maniplution for setting loading and saving to true or false within functions to allow for displaying of error handling. 
  
  //JWT token used for authentication
  const token = sessionStorage.getItem("jwt");
  let navigate = useNavigate();

  const searchHandlerForForm = (searchInput) => {
    //function which takes the search input as a parameter
    setSearchResult(
      //state of search result will be updated with the filtered list of properties, this is used for the display in the map. See below within return. 
      listOfProperties.filter(
        (property) =>
        property.type === searchInput.type &&
          Number(property.numberOfBathrooms) >= Number(searchInput.numberOfBathrooms) &&
          Number(property.numberOfBedrooms ) >= Number(searchInput.numberOfBedrooms) &&
          Number(property.garden) >= Number(searchInput.garden) &&
          (Number(searchInput.price) === 0 ||
            Number(property.price) <= Number(searchInput.price))
            //filter is used on the list of properties and a new array is created with all the elements that pass the conditon. 
            //this will then be set into the search result which can be used to display the search result. 
      )
    );
  };

  const propertyAddHandler = (newProperty) => {
    if(token === null){
      navigate('/login');
    }
    else{
      fetch("https://localhost:7091/Property", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` },
        body: JSON.stringify(newProperty),
              //post request to the defined url and the newProperty object converted to JSON

      })
        .then((response) => {
          if (!response.ok) {
            alert("Error occurred while adding a property");
            setSaving(false);
            throw response.status;
          } else return response.json();
                  //error handling for the response from the server, if this is not okay a alert will be thrown as well as showing the https error code
        })
        .then((newProperty) => {
          dispatch({ type: "ADD", payload: newProperty });
          setSaving(false);
          //if response is successful then the new property is sent as the payload using dispath with the type set as ADD, this is then used by the 
          //reducedPropertiesList function at the top which contains the action depending on the action type in this case ADD. Read above for details.
        });
      }
  };

  const deletePropertyHandler = (property) => {
    setSaving(true);
    //manipulates the state
    if(token === null){
      navigate('/login');
    }
    else{
      fetch(`https://localhost:7091/Property/${property.id}`, {
        method: "DELETE",
        headers: { "Authorization" : `Bearer ${token}` }
              //fetch the specific sellers id to match for deletion, https method delete is specified
      })
        .then((response) => {
          if (!response.ok) {
            alert("An error has occurred. Unable to delete property");
            setSaving(false);
            throw response.status;
          //error handling for the response from the server, if this is not okay a alert will be thrown as well as showing the https error code

          } else {
            dispatch({ type: "REMOVE", payload: property });
            setSaving(false);
          //if response is successful then the property is sent as the payload using dispath with the type set as REMOVE, this is then used by the 
          //reducedPropertiesList function at the top which contains the action depending on the action type in this case REMOVE. Read above for details.

          }
        })
        .catch((error) => {
          setSaving(false);
          console.log(error);
          alert("Error has occurred while deleting the property");
                  //error handling that if anything goes wrong then state of saving is changed as well as an error alert being given to the user that there was issue deleting the property 

        });
    }
  };

  const editPropertyHandler = (property) => {
    //console.log(property)
    if(token === null){
      navigate('/login');
    }
    else{
      fetch(`https://localhost:7091/Property/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` },
        body: JSON.stringify(property),
        //request made with a specific id for a property and a put method indicating an update of the property 
      })
        .then((response) => {
          if (!response.ok) {
            alert("An error has occurred, unable to edit property");
            setSaving(false);
            throw response.status;
            //error handling for bad requests
          }
          return response.json();
        })
        .then((updatedProperty) => {
          dispatch({
            type: "SET",
            payload: listOfProperties.map((p) =>
              p.id === updatedProperty.id ? updatedProperty : p
            ),
          });
          //action to update the state and the payload now is set with the updated property to the correct one by checking via the id and then using the SET in the reduced properties list function
          setSaving(false);
        })
        .catch((error) => {
          setSaving(false);
          console.log(error);
          alert("Error has occurred while editing the property");
        });
    } 
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://localhost:7091/Property")
      .then((response) => {
        if (!response.ok) {
          alert("Error occurred, could not load data of properties");
          throw response.status;
          //GET request to get all the properties and set this into state
        }
        return response.json();
      })
      .then((properties) => {
        dispatch({ type: "SET", payload: properties });
        setSearchResult(properties);
        //using a type of SET and the payload of all the propeties, search result is set with all this information which is used later for the display
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Error has occurred getting the data");
      });
  }, []);

  useEffect(() => {
    dispatch({ type: "SET", payload: listOfProperties });
    setSearchResult(listOfProperties);
  }, [listOfProperties]);
  //use effect introduced for when the listOfProperties changes the state is refreshred and set to the the search result meaning when the data is filtered the updated list of displays is shown to the user and can 
//search for whaat they want. 

  const togglePropertyInputForm = () => {
    setShowPropertyInputForm((prevShowForm) => !prevShowForm);
  };
  //function for controlling visbiilty of the form being show or not 

  const togglePropertySearchForm = () => {
    setShowPropertySearchForm((prevShowForm) => !prevShowForm);
  };
  //function for controlling visbiilty of the form being show or not 

  const togglePropertyEditForm = () => {
    setShowPropertyEditForm((prevShowForm) => !prevShowForm);
  };
  //function for controlling visbiilty of the form being show or not 

  const startEditProperty = (property) => {
    setEditedProperty(property);
  };
  //iniates the start edit function and the property is set to the nll state of editedProperty and then passed to the pass edit from, means the data is pre populated before we begin the edit

  return (
    <>
        <h1 class="display-2" >&nbsp;Properties Page</h1>
        <br />
      <div className="bg-body-tertiary text-white p-4">
        {showPropertyInputForm && (
          <PropertyAddForm propertyAddHandler={propertyAddHandler} />
        )}

        <br />

        {showPropertySearchForm && (
          <PropertySearchForm searchHandlerForForm={searchHandlerForForm} />
        )}

        <br />

        {showPropertyEditForm && (
          <PropertyEditForm
            property={editedProperty}
            editPropertyHandler={editPropertyHandler}
            onClose={() => setShowPropertyEditForm(false)}
          />
        )}

        {loading || saving ? (
          <div>
            {loading ? "Loading Properties Information" : ""}
            {saving ? "Saving Properties Information" : ""}
          </div>
        ) : (
          ""
        )}

        <div className="d-flex justify-content-center align-items-center flex-column">
          <button
            className={`btn ${
              showPropertySearchForm
                ? "btn-outline-danger btn-lg"
                : "btn-outline-success btn-lg"
            } mb-2 p-3`}
            style={{ width: "200px" }} 
            onClick={togglePropertySearchForm}
          >
            {showPropertySearchForm ? (
              <>
                <FontAwesomeIcon icon={faMinus} /> search Form
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMagnifyingGlass} /> for a property
              </>
            )}
          </button>
          <button
            className={`btn ${
              showPropertyInputForm
                ? "btn-outline-danger btn-lg"
                : "btn-outline-success btn-lg"
            } mb-2 p-3`} style={{ width: "200px" }}
            onClick={togglePropertyInputForm}
          >
            {showPropertyInputForm ? (
              <>
                <FontAwesomeIcon icon={faMinus} /> &nbsp; Input Form
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} /> new property
              </>
            )}
          </button>
        </div>

        <div>
          <br />
          {searchResult.length === 0 && !loading ? (
            <div>No properties found</div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2">
              {searchResult.map((property) => (
                <div key={property.id} className="col">
                <div class="card m-3 shadow">
                  <img
                    class="card-img-top"
                    src={property.img ? require(`../../images/${property.img}`) : require('../../images/img1.jpg')}
                    alt="Card image cap"
                    style={{ filter: property.status === 'SOLD' ? 'grayscale(100%)' : 'none' }}
                  />
                  <div className="card-body">
                      <h5 className="card-title" style={{minHeight:"3rem"}}>{property.address}</h5>
                      <p className="card-text">
                        Postcode: {property.postcode}{" "}
                        <FontAwesomeIcon
                          icon={faMapPin}
                          style={{ color: "red" }}
                         
                        />
                      </p>
                      <p className="card-text">
                        No of Bedrooms: {property.numberOfBedrooms}{" "}
                        <FontAwesomeIcon
                          icon={faBed}
                          style={{ color: "#00ace6" }}
                          
                        />
                      </p>

                      <p className="card-text">
                        No of Bathrooms: {property.numberOfBathrooms}{" "}
                        <FontAwesomeIcon
                          icon={faBath}
                          style={{ color: "#00ace6" }}
              
                        />
                      </p>
                                    
                        <p className="card-text">
                          {property.garden ? (
                            <>
                             Garden: Yes
                              <FontAwesomeIcon icon={faTree} style={{ color: "green" }} />
                            </>
                          ) : (
                            <>
                             No Gardens
                             <FontAwesomeIcon icon={faXmark} style={{ color: "green" }} />
                            </>
                           
                          )}
                        </p>

                      <p className="card-text">
                        Type: {property.type}{" "}
                        <FontAwesomeIcon
                          icon={faHouseChimney}
                          style={{ color: "#a86f2e" }}
                          
                        />
                      </p>
                      <p className="card-text">
                        Price: £{property.price}{" "}
                        <FontAwesomeIcon
                          icon={faCoins}
                          style={{ color: "#dcad04" }}
                          
                        />
                      </p>
                     
                       <p className="card-text"> {property.status} {property.status === 'SOLD' ? (
                          <FontAwesomeIcon icon={faXmark} style={{ color: 'red' }} />
                        ) : (
                          <FontAwesomeIcon icon={faHouseFlag} style={{ color: 'green' }} />
                        )}
                        </p>
        
                      <button
                        type="button"
                        className="btn btn-outline-danger m-1"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal-${property.id}`}
                      >
                        Delete <FontAwesomeIcon icon={faTrash} />
                      </button>

                      <div
                        className="modal fade"
                        id={`exampleModal-${property.id}`}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby={`exampleModalLabel-${property.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id={`exampleModalLabel-${property.id}`}
                              >
                                Delete Property
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              Are you sure you want to delete this property?
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  deletePropertyHandler(property);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => {
                          startEditProperty(property);
                          togglePropertyEditForm();
                        }}
                      >
                        Edit <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        className="btn btn-outline-info"
                        onClick={() => {
                      naviagte(`/booking/${property.id}`)
                        }}
                      >
                        Booking <FontAwesomeIcon icon={faBookOpen} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Property;
