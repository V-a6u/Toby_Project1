import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { useRef } from "react";


const SellerForm = (props) => {

    const addSellerHandler = props.addSellerHandler;
    // passing the seller handler function down which has been defined in the Seller
    //extracting this from props

    const refFirstName = useRef();
    const refSurname = useRef();
    const refAddress = useRef();
    const refPhone = useRef();
    const refPostcode = useRef();

    //setting the refernce to start as empty will assign below for use later

    const resetForm =() => {
        refFirstName.current.value = "";
        refSurname.current.value = "";
        refAddress.current.value = "";
        refPhone.current.value = "";
        refPostcode.current.value = "";
        //explination below line 46. 
    }

    const sumbitHandler = (event) => {
       event.preventDefault(); 
        //sumbit handler for when the submit button is pressed and used by the user. If statement is run to check if the inputted values match those of the and then will then proceed to add these to the db json 
        const isValidInput = (input) => {
            return /^\d+$/.test(input); // Checks if the input is a positive integer
          };
        if ( refFirstName.current.value && refSurname.current.value && refAddress.current.value && refPostcode.current.value && isValidInput(refPhone.current.value)){
            //makes sure to have all the values to be able to add a seller using the function. 
            addSellerHandler(
                {
                    firstName: refFirstName.current.value,
                    //adds the first name given the value of the submit provided in the text box of the form, same goes for all the others below 
                    surname: refSurname.current.value,
                    address: refAddress.current.value,
                    postcode: refPostcode.current.value,
                    phone: refPhone.current.value,
                    properties:[]
                }
                //add seller handler is defined in parent component. Values are set with the those from the form and the function (check addSellerHandler in seller) will run its logic. 
                //this will then proceed to add the handler to the state. 
            )
            resetForm();
            //form values are reset back to empty each time once action is called. Function is defined above. 
            } else {
                alert("Please enter a valid phone number")
            }
    
    }

   
    return (
        <>
        
<div className="container">
<h1 class="display-6 text-black">Add a new seller:</h1>
        <form>
            <div class="form-row text-black">
        <div class="col">
            <label>First Name</label>
            <input type="text"  placeholder="Enter first name" class="form-control" id="sellerFirstName" ref={refFirstName}/>
        </div>

        <div>
            <label>Surname</label>
            <input type="text"  placeholder="Enter surname" class="form-control" id="sellerSurname" ref={refSurname}></input>
            {/* the ref is given the ref set by use ref above which is started as empty. */}
        </div>

        <div>
            <label>Address</label>
            <input type="text" placeholder="Enter address" class="form-control" id="sellerAddress" ref={refAddress}></input>
        </div>

        <div>
            <label>Postcode</label>
            <input type="text"  placeholder="Enter postcode" class="form-control" id="sellerPostcode" ref={refPostcode}></input>
        </div>

        <div>
            <label>Phone Number</label>
            <input type="text" placeholder="Enter phone number" required pattern="123456890" class="form-control" id="sellerPhoneNumber" ref={refPhone} inputmode="numeric"></input>
        </div>
        <br />

        <div className="d-flex justify-content-center align-items-center">
            <button type="submit" class="btn btn-success p-2 btn-lg" onClick={sumbitHandler} style={{ width: "150px" }}><FontAwesomeIcon icon={faPlus}  />&nbsp;New Seller </button>
            {/* when the add new seller button is clicked the submitHandler function is called and the inputs are filled with the vlaues which were entered into the text inputs */}
        </div>
        </div>
        </form>
        </div>

        </>
      );
}
 
export default SellerForm;