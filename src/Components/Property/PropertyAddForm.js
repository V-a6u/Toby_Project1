import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"


const PropertyAddForm = (props) => {
const propertyAddHandler = props.propertyAddHandler

    const refAddress = useRef();
    const refPostcode = useRef();
    const refGardens = useRef();
    const refBedrooms = useRef();
    const refBathrooms = useRef();
    const refPrice = useRef();
    const refStatus = useRef();
    const refType = useRef();

    const resetForm =() => {
        refAddress.current.value = "";
        refPostcode.current.value = "";
        refGardens.current.value = "";
        refBedrooms.current.value ="";
        refBathrooms.current.value = "";
        refPrice.current.value = "";
        refStatus.current.value = "";
        refType.current.value = "";
    }


    const submitHandler = (event) => {
        event.preventDefault();

        //const isValidInput = (input) => {
        //    return /^\d+$/.test(input); // Checks if the input is a positive integer
        //  };

        if (
            refAddress.current.value &&
            refPostcode.current.value &&
          refGardens.current.value &&
           refBathrooms.current.value &&
            refPrice.current.value &&
            refStatus.current.value &&
            refType.current.value
        ) {
            propertyAddHandler({
                address: refAddress.current.value,
                postcode: refPostcode.current.value,
                gardens: refGardens.current.checked,
                numberOfBedrooms: refBedrooms.current.value,
                numberOfBathrooms: refBathrooms.current.value,
                price: refPrice.current.value,
                status: refStatus.current.value,
                type: refType.current.value,
                sellerId: 1,
                buyerId: 3
            });
            resetForm();
        } else {
            alert("Please enter valid input for Gardens, Bathrooms, and Price.");
    };
    };

    return ( 
    <>
    <div className="container">
        
<h1 class="display-6 text-black">Add a new property:</h1>
      
     <form>
            <div class="form-row text-black">
            <div class="col">
                <label>Address</label>
                <input type="text" placeholder="Enter address" class="form-control" id="propertyAddress" ref={refAddress} />
            </div>

            <div class="col">
                <label>Postcode</label>
                <input type="text" placeholder="Enter postcode" class="form-control" id="propertyPostcode" ref={refPostcode} />
            </div>

            <div class="col">
                <label>Gardens</label>
                <input type="checkbox" placeholder="Enter gardens" class="form-check-input" id="propertyGardens" ref={refGardens} />
            </div>

            <div class="col">
                <label>Bedrooms</label>
                <input type="number" placeholder="Enter bedrooms" class="form-control" id="propertyBedrooms" ref={refBedrooms} />
            </div>

            <div class="col">
                <label>Bathrooms</label>
                <input type="number" placeholder="Enter bathrooms" class="form-control" id="propertyBathrooms" ref={refBathrooms} />
            </div>

            <div class="col">
                <label>Price</label>
                <input type="number" placeholder="Enter price" class="form-control" id="propertyPrice" ref={refPrice} />
            </div>
            <div class="col">
                <label>Type</label>
                <select  placeholder="Enter type" class="form-select" id="propertyType" ref={refType} >
                <option value="">Select Type</option>
                <option value="APARTMENT">APARTMENT</option>
                <option value="SEMI">SEMI</option>
                <option value="SEMI-DETACHED">SEMI_DETACHED</option>
                </select>
            </div>
            <div class="col">
                <label>Status</label>
                <select placeholder="Enter status" class="form-select" id="propertyStatus" ref={refStatus}>
                <option value="">Select Status</option>
                <option value="FOR SALE">FOR SALE</option>
                <option value="SOLD">SOLD</option>
                </select>
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center">
               
                <button type="submit" class="btn btn-success btn-lg p-2" onClick={submitHandler}>
                <FontAwesomeIcon icon={faPlus}/>&nbsp;New Property
                    <br />
                </button>
            
            </div>
            </div>
        </form>
        <br />
</div>
    </>
     );
}
 
export default PropertyAddForm;