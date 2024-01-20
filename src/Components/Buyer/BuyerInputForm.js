import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom";
import { useRef } from "react";

const BuyerInputForm = (props) => {
    //for explination of functionality please see seller, these are very similar following the same code layout and functionallity for explination. 

    const buyerAddHandler = props.buyerAddHandler;

    const refFirstName = useRef();
    const refSurname = useRef();
    const refAddress = useRef();
    const refPostcode = useRef();
    const refPhone = useRef();

    const resetForm =() => {
        refFirstName.current.value = "";
        refSurname.current.value = "";
        refAddress.current.value = "";
        refPhone.current.value = "";
        refPostcode.current.value = "";
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const isValidInput = (input) => {
            return /^\d+$/.test(input); // Checks if the input is a positive integer
        }
        if (
            refFirstName.current.value &&
            refSurname.current.value &&
            refAddress.current.value &&
            refPostcode.current.value &&
            isValidInput(refPhone.current.value)
        ) {
            buyerAddHandler({
                firstName: refFirstName.current.value,
                surname: refSurname.current.value,
                address: refAddress.current.value,
                postcode: refPostcode.current.value,
                phone: refPhone.current.value,
            });
            resetForm();
        } else {
            alert("Please enter a valid phone number")
        }
    };

    return (
        <>
        <div className="container">
            <h1 class="display-6">&nbsp;Add a new buyer:</h1>
        <form>
            <div class="form-row">
            <div class="col">
                <label>First Name</label>
                <input type="text" placeholder="Enter first name" class="form-control" id="buyerFirstName" ref={refFirstName} />
            </div>

            <div class="col">
                <label>Surname</label>
                <input type="text" placeholder="Enter surname" class="form-control" id="buyerSurname" ref={refSurname} />
            </div>

            <div class="col">
                <label>Address</label>
                <input type="text" placeholder="Enter address" class="form-control" id="buyerAddress" ref={refAddress} />
            </div>

            <div class="col">
                <label>Postcode</label>
                <input type="text" placeholder="Enter postcode" class="form-control" id="buyerPostcode" ref={refPostcode} />
            </div>

            <div class="col">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" class="form-control" id="buyerPhoneNumber" ref={refPhone} />
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center">
               
                <button type="submit" class="btn btn-success p-2" onClick={submitHandler} style={{ width: "150px" }}>
                <FontAwesomeIcon icon={faPlus}/>&nbsp;New Buyer
                    <br />
                </button>
            
            </div>
            </div>
        </form>
        </div>
        </>
    );
};

export default BuyerInputForm;