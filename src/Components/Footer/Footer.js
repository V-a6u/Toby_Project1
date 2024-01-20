import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom";
import {faPhone, faAt, faMapLocationDot} from "@fortawesome/free-solid-svg-icons"
import{faInstagram, faFacebook, faLinkedin , faTwitter} from "@fortawesome/free-brands-svg-icons"
const Footer = () => {
    return ( 
        <>
<footer class="text-center text-lg-start bg-body-info text-muted">
<section class="d-flex justify-content-between p-4 border-bottom">
  <div class="d-flex align-items-center">
    <span class="me-3">Connect with us on socials:</span>

    <a href="" class="me-4 text-reset fa-lg">
      <FontAwesomeIcon icon={faInstagram} style={{ color: "#bb06e0" }} />
    </a>
    <a href="" class="me-4 text-reset fa-lg">
      <FontAwesomeIcon icon={faTwitter}  style={{ color: "#0792e9" }} />
    </a>
    <a href="" class="me-4 text-reset fa-lg">
      <FontAwesomeIcon icon={faFacebook}  style={{ color: "#0822e2" }} />
    </a>
    <a href="" class="me-4 text-reset fa-lg">
      <FontAwesomeIcon icon={faLinkedin}  style={{ color: "#0792e9" }} />
    </a>
  </div>
</section>


  <section class="">
    <div class="container text-center text-md-start mt-5">
      <div class="row mt-3">
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-2">
          Rook
          </h6>
          <h6 class="text-uppercase fw-bold mb-2">
         Residences
          </h6>
          <p>
            Check out our helpful links and how we can help secure your next home.
          </p>
        </div>

        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
          <Link to="/property" className="text-reset">
              Properties
          </Link>
          </p>
          <p>
            <a href="#!" class="text-reset">About Us</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Help</a>
          </p>
          <p>
          <Link to="/login" className="text-reset">
              Login
          </Link>
          </p>
        </div>

        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 class="text-uppercase fw-bold mb-4">Contact Us</h6>
          <p class="fasme-3"> <FontAwesomeIcon icon={faMapLocationDot}/> &nbsp;186 Braveheart Lane, Perth, PH8 7LF</p>
          <p class="fasme-3"> <FontAwesomeIcon icon={faAt}/>&nbsp;
          RookResidences@chess.com
          </p>
          <p class="fasme-3"> <FontAwesomeIcon icon={faPhone}/>&nbsp;01652 864579</p>
        </div>
      </div>
    </div>
  </section>

  <div class="text-center p-4">
     2023 Copyright:&nbsp;
    <a class="text-reset fw-bold">RookResidences.com</a>
  </div>
</footer>

        </>
     );
}
 
export default Footer;