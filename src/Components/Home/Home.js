import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessRook } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    return (
        <>
        <section>
        <div class="container p-5">
        <div className="d-flex align-items-center justify-content-center">
                <h1 className="display-3 text-center">Rook Residencies&nbsp;<FontAwesomeIcon icon={faChessRook}/></h1>  
            </div>
    <div
    id="carouselExampleIndicators"
    class="carousel slide"
    data-bs-ride="true"
  >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
      <img className="d-block w-100" src={require("../../images/homeimg3.jpg")} alt="First slide" style={{ filter: "grayscale(100%)" }} />
      </div>
      <div class="carousel-item">
      <img className="d-block w-100" src={require("../../images/chesshome.jpg")} alt="First slide" style={{ filter: "grayscale(100%)" }} />

      </div>
      <div class="carousel-item">
      <img className="d-block w-100" src={require("../../images/chesshomeredo.png")} alt="First slide" style={{ filter: "grayscale(100%)" }} />

      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>
<div className="d-flex align-items-center justify-content-center">
                <h1 className="display-3 text-center">Helping you make the first move.</h1>
            </div>
            <br />
            <br />
</section>
      
        </>
    );
 
};

export default Home;