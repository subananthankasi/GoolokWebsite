import React from 'react'  
import b2 from "../../assets/images/sale_banner1.jpg";
import b3 from "../../assets/images/sale_banner2.jpg";
import mb1 from "../../assets/images/MobileView/mob_banner1.jpg";
import mb2 from "../../assets/images/MobileView/mob_banner2.jpg";

function Banner() {
  return (
    <>
      <section className='DesKtopView'>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={b2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={b3} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>




 
{/* ////////////////////////////////////////
//////  web app view ///////
////////////////////////////////////////  */}

<section className='MobileView'>
  <div
    id="carouselExampleControls1"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleControls1"
        data-bs-slide-to={0}
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleControls1"
        data-bs-slide-to={1}
        aria-label="Slide 2"
      />
    </div>

    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={mb1} className="d-block w-100" alt="..." />
      </div>
      <div className="carousel-item">
        <img src={mb2} className="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls1"
      data-bs-slide="prev"
    >
       
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls1"
      data-bs-slide="next"
    >
    
    </button>
  </div>
</section>


    </>
  )
}

export default Banner