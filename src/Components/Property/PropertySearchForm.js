import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React, {useRef} from "react";
const PropertySearchForm = (props) => {

   const searchHandlerFormInput = props.searchHandlerForForm;
   //setting the search handler function in a varibale for easier use, extracted via the prop which has been passed down containing the function

    const referenceType = useRef();
    const referenceBedroom = useRef();
    const referenceBathroom = useRef();
    const referenceGarden = useRef();
    const referencePrice = useRef();
    //these set the value to zero and are used later both in the function itself and the form to gain the data inputed by the user


    const doSearch = () => {
        searchHandlerFormInput(
            {
                type: referenceType.current?.value,
                numberOfBedrooms: referenceBedroom.current?.value,
                numberOfBathrooms: referenceBathroom.current?.value,
                garden: referenceGarden.current?.value,
                price: referencePrice.current?.value,
            }
        );
    }
    //identifies the current value of the input from the form using the typeRef and than then uses it within the searchCriteria function

    return ( 
        <>
        <div className="container">
       
       
            <div className="row justify-content-center">
            
                <div className="col-lg-8 col-md-5 col-lg-8">
                    <form>
                    <h1 class="display-6 text-black">Find the perfect property:</h1>
        <br />
                        <div className="row">
                            
                                <div className="form-group text-black">
                                    <label>Type</label>
                                    <select className="form-control form-control-sm" ref={referenceType}>
                                        <option value="ANY">Any</option>
                                        <option value="DETACHED">Detached</option>
                                        <option value="SEMI">Semi</option>
                                        <option value="APARTMENT">Apartment</option>
                                    </select>
                                </div>
                           
                            
                                <div className="form-group text-black">
                                    <label>Price</label>
                                    <select className="form-control" ref={referencePrice}>
                                        <option value="0">Any</option>
                                        <option value="50000">Up to 50000</option>
                                        <option value="100000">Up to 100000</option>
                                        <option value="200000">Up to 200000</option>
                                        <option value="300000">Up to 300000</option>
                                        <option value="400000">Up to 400000</option>
                                    </select>
                                </div>
                            
                           
                                <div className="form-group text-black">
                                    <label>Bedrooms</label>
                                    <select className="form-control" ref={referenceBedroom}>
                                        <option value="0">Any</option>
                                        <option value="1">Minimum 1</option>
                                        <option value="2">Minimum 2</option>
                                        <option value="3">Minimum 3</option>
                                        <option value="4">Minimum 4</option>
                                        <option value="5">Minimum 5</option>
                                    </select>
                                </div>
                            
                            
                                <div className="form-group text-black">
                                    <label>Bathrooms</label>
                                    <select className="form-control" ref={referenceBathroom}>
                                        <option value="0">Any</option>
                                        <option value="1">Minimum 1</option>
                                        <option value="2">Minimum 2</option>
                                        <option value="3">Minimum 3</option>
                                    </select>
                                
                            </div>
                           
                                <div className="form-group text-black">
                                    <label>Garden</label>
                                    <select className="form-control" ref={referenceGarden}>
                                        <option value="0">Any</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                
                            </div>
                        </div>
                        <div className="text-end">
                            &nbsp;
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="button" className="btn btn-primary mb-2 p-3"  style={{ width: "200px" }}  onClick={doSearch}> 
                                    <i className="bi bi-search"></i>&nbsp;find properties <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default PropertySearchForm;