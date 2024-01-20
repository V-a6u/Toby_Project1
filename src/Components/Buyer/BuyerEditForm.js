import { useState, useEffect } from "react";
const BuyerEditForm = ({buyer, editBuyerHandler, onClose}) => {

  //for explination of functionality please see seller, these are very similar following the same code layout and functionallity for explination. 


    const [editedBuyer, setEditedbuyer] = useState({...buyer})
    const [formVisible, setFormVisible] = useState(true);


    useEffect(() => {
        setEditedbuyer({...buyer})
    }, [buyer]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEditedbuyer(( previousBuyer) => ({
            ...previousBuyer,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        editBuyerHandler(editedBuyer);
        setFormVisible(false);
        onClose();
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
          value={editedBuyer.firstName || ""}
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
          value={editedBuyer.surname || ""}
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
          value={editedBuyer.address || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postcode" className="form-label text-black">
          Postcode
        </label>
        <input
          type="text"
          className="form-control"
          id="postcode"
          name="postcode"
          value={editedBuyer.postcode || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label text-black">
          Phone Number
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={editedBuyer.phone || ""}
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
 
export default BuyerEditForm;