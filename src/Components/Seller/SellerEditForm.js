import { useState, useEffect } from "react";
const SellerEditForm = ({seller, editSellerHandler, onClose}) => {
    //props passed down to the parent component above to be used in the form itself

    const [editedSeller, setEditedSeller] = useState({...seller})
    // state varibale of editedSeller defined and inital state is set to the copy of the seller thats been passed down via the props above from the parent Seller component. 
    const [formVisible, setFormVisible] = useState(true);
    //state for controlling visibilty of the form on the page 


    useEffect(() => {
        setEditedSeller({...seller})
    }, [seller]);
    //used to reflect the change in the seller is updated with current seller that has been clicked in the seller component. If the seller prop changes this is called and the seller updated in the state above. 

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEditedSeller(( previousSeller) => ({
            ...previousSeller,
            [name]: value
        }));
        //called when a change in the form occurs. Name and Value is then extratcted from the form from the event that triggered the target. 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //prevent the default which would cause a page relaod every time if this wasnt here.
        editSellerHandler(editedSeller);
        setFormVisible(false);
        onClose();
        //called when the form is submitted by the user. The edit seller handler function (passed down above) is set with the editedSeller data starting the editing process. Form is then hidden via state. 
        //onClose is then called which was passed down above. It hides the form once the submit is clicked by updating the state in seller parenty component. 
      };


    return ( 
        <>
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label text-black">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={editedSeller.firstName || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="surname" className="form-label text-black">
          Surname
        </label>
        <input
          type="text"
          className="form-control"
          id="surname"
          name="surname"
          value={editedSeller.surname || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label text-black">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={editedSeller.address || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postcode" className="form-label text-black">
          Surname
        </label>
        <input
          type="text"
          className="form-control"
          id="postcode"
          name="postcode"
          value={editedSeller.postcode || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label text-black">
          Surname
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={editedSeller.phone || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-success me-2">
          Save
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onClose()}>
          Cancel
        </button>
       
      </div>
      </form>
        </>
     );
}
 
export default SellerEditForm;