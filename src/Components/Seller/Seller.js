import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import SellerAddForm from "./SellerAddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPenToSquare, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import SellerEditForm from "./SellerEditForm";
import Login from "../Login/Login";
import { Navigate } from "react-router-dom/dist";
import { useNavigate } from "react-router-dom/dist";

const Seller = () => {
  const [loading, setLoading] = useState(true);
  //state for setting loading to be true or false, used within functions that will be used in the turney within the return as well(see below)
  const [sellers, setSellers] = useState([]);
  // used during testing to display the inital list from the backend into a list (see early commits)
  const [saving, setSaving] = useState(false);

  const reducedSellersList = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      //if the action type is set to add then the new state will be add to the list of sellers and state updated
      case "SET":
        return action.payload;
        //returns the state as is 
      case "REMOVE":
        return state.filter((seller) => seller.id !== action.payload.id);
        //used for delete that filters the current state, if the given sellersid matched that of the seller id contained within the buyer then the seller will be removed
      default:
        return state;
    }
    //switch statement thats used to change the case depending on the action.type which will invoke a diff action each time
  };

  const [listOfSellers, dispatch] = useReducer(reducedSellersList, []);
  //creates 2 varibales of listOfSellers and dispatch. Using useReducer hook to handle state. Takes 2 arguments of the reducer function ie reducedSellersList and intial state of an empty array
  // as above reducedSellersList is a function which manipulates the state in response to different actions
  const [showSellerInputForm, setShowSellerInputForm] = useState(false);
  //state for showing and hiding the seller input form used below 
  const [editedSeller, setEditedSeller] = useState(null)
  const [showSellerEditForm, setShowSellerEditForm] = useState(false);
  //state for showing and hiding the seller edit form used below

  //JWT token used for authentication
  let navigate = useNavigate();
  const token = sessionStorage.getItem("jwt");
  const [isAuthenticated, setAuth] = useState(false);
  //console.log("token: " + token);

  const addSellerHandler = (newSeller) => {
    //add seller function which takes in a new seller 
    if(token === null){
      navigate('/login');
    }
    else{
      if (
        listOfSellers.filter(
          //filters the list of sellers fo each seller and compares if the sellers first name matches that of the new sellers first name as well as second name

          (seller) =>
            seller.firstName === newSeller.firstName &&
            seller.surname === newSeller.surname
        ).length
      ) {
        alert("Seller already exists in the list");
        return;
        //if a seller macthing the first name and surname appears then a alrt is thrown stating tthe seller alredy exists
      }
      setSaving(true);
      //state set to true

      fetch("https://localhost:7091/Seller", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` },
        body: JSON.stringify(newSeller),
        //post request to the defined url and the newSeller object converted to JSON
      })
        .then((response) => {
          if (!response.ok) {
            alert("An error has occurred. Unable to add seller");
            setSaving(false);
            throw response.status;
          } else return response.json();
          //error handling for the response from the server, if this is not okay a alert will be thrown as well as showing the HTTP error code
        })
        .then((newSeller) => {
          dispatch({ type: "ADD", payload: newSeller });
          setSaving(false);
          //if response is successful then the new seller is sent as the payload using dispath with the type set as ADD, this is then used by the 
          //reducedSellerList function at the top which contains the action depending on the action type in this case ADD. Read above for details.
        });
    }
  };

  const deleteSellerHandler = (seller) => {
    setSaving(true);
    //manipulates the state

    if(token === null){
      navigate('/login');
    }
    else{
      fetch(`https://localhost:7091/Seller/${seller.id}`, {
        method: "DELETE",
        headers: { "Authorization" : `Bearer ${token}` }
        //fetch the specific sellers id to match for deletion, HTTP method delete is specified
      })
        .then((response) => {
          if (!response.ok) {
            alert("An error has occurred. Unable to delete seller");
            setSaving(false);
            throw response.status;
          //error handling for the response from the server, if this is not okay a alert will be thrown as well as showing the HTTP error code
        } else {
            dispatch({ type: "REMOVE", payload: seller });
            setSaving(false);
          //if response is successful then the seller is sent as the payload using dispath with the type set as REMOVE, this is then used by the 
          //reducedSellerList function at the top which contains the action depending on the action type in this case REMOVE. Read above for details.
        }
        })
        .catch((error) => {
          setSaving(false);
          console.log(error);
          alert("Error has occurred while deleting the seller");
          //error handling that if anything goes wrong then state of saving is changed as well as an error alert being given to the user that there was issue deleting the seller 
        });
    }
  };

  const editSellerHandler = (seller) => {
    if(token === null){
      navigate('/login');
    }
    else{
      fetch(`https://localhost:7091/Seller/${seller.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}` },
        body: JSON.stringify(seller),
        //sends a PUT request which will update the data on the server. Converts the seller object to JSON string. 
      })
        .then((response) => {
          if (!response.ok) {
            alert("An error has occurred, unable to edit seller");
            setSaving(false);
            throw response.status;
            //see above for explination of same code
          }
          return response.json();
        })
        .then((updatedSeller) => {
          dispatch({
            type: "SET",
            payload: listOfSellers.map((s) =>
              s.id === updatedSeller.id ? updatedSeller : s
            ),
            //dispatch action with the type set as SET and the payload is given an updated list of sellers with the seller with the same id is replaced with the updated seller. 
          });
          setSaving(false);
          //state changed when completion of asynchronous function is finished. 
        })
        .catch((error) => {
          setSaving(false);
          console.log(error);
          alert("Error has occurred while editing the seller");
            //see above for explination of same code
          });
      }
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://localhost:7091/Seller")
    //used to obtain list of all the sellers when page refreshes or state changes
      .then((response) => {
        if (!response.ok) {
          alert("Error occurred, could not load data of sellers");
          throw response.status;
        } else return response.json();
        //see above for explination of same code

      })
      .then((sellers) => {
        dispatch({ type: "SET", payload: sellers });
        //takes sellers (all of them) and is used with useReducer and reducedSellersList function by setting type as SET with the payload of all sellers. See explination of this function above. 
        setLoading(false);
        setSellers(sellers);
        //above was used for testing purposes to display a list of sellers initally 
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Error has occurred while getting the data");
        //see above for explination of same code

      });
  }, []);

  const toggleSellerInputForm = () => {
    setShowSellerInputForm((prevShowForm) => !prevShowForm);
  };
  //functions responsible for the input form to be toggled on and off. Manages the showsellerinputform state which is above. 

  const toggleSellerEditForm = () => {
    setShowSellerEditForm((prevShowForm) => !prevShowForm);
  };
  //used the same as above just for the edit form instead

  const startEditSeller = (seller) => {
    setEditedSeller(seller);
  };
  //set to the click of the edit button before the form is shown to the user. The current seller is then set into the edited seller state which is set to null to begin. This is then passed down to the SellerEditForm Component (see below) 

  return (
    <>
    <h1 class="display-1">&nbsp;Sellers List</h1>
    <br />
      <div className="bg-body-tertiary text-white p-4">
        {showSellerInputForm && (
          <SellerAddForm addSellerHandler={addSellerHandler} />
          //seller add form is passed down the add seller handler to the function 
        )}
        <br />

        {showSellerEditForm && (
          <SellerEditForm
            seller={editedSeller}
            // passed down to the form above as stated in line 185. 
            editSellerHandler={editSellerHandler}
            //editsellerhandler fucntion passed down to the form
            onClose={() => setShowSellerEditForm(false)}
            //function passed down which in turn used to hide the form once its clicked. 
          />
        )}

        {loading || saving ? (
          <div>
            {loading ? "Loading Sellers Information" : ""}
            {saving ? "Saving Seller Information" : ""}
          </div>
        ) : (
          ""
        )}
         <div className="d-flex justify-content-center align-items-center flex-column">
        <button
          className={`btn ${
            showSellerInputForm ? "btn-outline-danger  btn-lg" : "btn-outline-success  btn-lg"
          } mb-2 p-2`} style={{ width: "150px" }}
          onClick={toggleSellerInputForm}
        >
          {showSellerInputForm ? (
            <>
              <FontAwesomeIcon icon={faMinus} /> Form
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} /> Seller
            </>
          )}
      
        </button>
        </div>
        <div className="container-fluid">
        <div className="row justify-content-center">
        <div className="col-lg-7">
        <table  class="table table-hover table-bordered">
          <thead >
            <tr >
              <th scope="col">First Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Address</th>
              <th scope="col">Postcode</th>
              <th scope="col">Phone</th>
              <th scope="col">Properties</th>
              <th scope="col">Action</th>
             
            </tr>
          </thead>
          <tbody>
            {listOfSellers.length === 0 && !loading ? (
              //turnery for displaying noting if the seller list itself is empty and there is nothing to show
              <tr>
                <td colSpan="6">No sellers found</td>
              </tr>
            ) : (
              listOfSellers.map((seller) => (
                <tr key={seller.id}>
                  <td>{seller.firstName}</td>
                  <td>{seller.surname}</td>
                  <td>{seller.address}</td>
                  <td>{seller.postcode}</td>
                  <td>{seller.phone}</td>
                  <td>
                    <button type="button" className="btn btn-outline-info p-2">
                      <Link to={`/seller/${seller.id}/properties`} className="text-decoration-none">
                        View Properties <FontAwesomeIcon icon={faSearch}/>
                      </Link>
                    </button>
                  </td>
                  <td>
  
                  <button
                        type="button"
                        className="btn btn-outline-danger m-1"
                        data-bs-toggle="modal"
                        style={{ width: "100px" }}
                        data-bs-target={`#exampleModal-${seller.id}`}
                      >
                        Delete <FontAwesomeIcon icon={faTrash} />
                      </button>

                      <div
                        className="modal fade"
                        id={`exampleModal-${seller.id}`}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby={`exampleModalLabel-${seller.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id={`exampleModalLabel-${seller.id}`}
                              >
                                Delete Seller
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
                              Are you sure you want to delete this seller?
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
                                  deleteSellerHandler(seller);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button  type="button"
                        className="btn btn-outline-warning" style={{ width: "100px" }} onClick={() => {
                          startEditSeller(seller);
                          toggleSellerEditForm();

                        }}>Edit <FontAwesomeIcon icon={faPenToSquare}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>  
      </div>  
      </div>  
    </>
  );
};

export default Seller;
