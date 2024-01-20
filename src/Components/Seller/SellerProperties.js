import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faTree,
  faHouseChimney,
  faMapPin,
  faXmark,
  faCoins,
  faHouseFlag,
  faBath
} from "@fortawesome/free-solid-svg-icons";

const SellerProperties = ({}) => {
  const { sellerId } = useParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //JWT token used for authentication
  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    // Fetch properties based on the sellerId
    fetch(`https://localhost:7091/Property`)
      .then((response) => response.json())
      .then((properties) => {
        setProperties(properties.filter((p) => p.sellerId == sellerId));
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
    
      <div>
        <br />
        {properties.length === 0 && !loading ? (
          <div>No properties found</div>
        ) : (

          <div className="container">
              <h1 className="display-1">Properties Associated with Seller</h1>
          <div className="row row-cols-1 g-2">
            {properties.map((property) => (
              <div key={property.id} className="col">
                <div class="card m-3 shadow">
                  <img
                    class="card-img-top"
                    src={
                      property.img
                        ? require(`../../images/${property.img}`)
                        : require("../../images/noimg.jpg").default
                    }
                    alt="Card image cap"
                    style={{ filter: property.status === 'SOLD' ? 'grayscale(100%)' : 'none' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{property.address}</h5>
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
                          Gardens: Yes
                          <FontAwesomeIcon icon={faTree} style={{ color: "green" }} />
                        </>
                      ) : (
                        "No Gardens"
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
                  </div>
                </div>
              </div>
            ))}
            </div>
          
          </div>
        )}
      </div>
    </>
  );
};

export default SellerProperties;
