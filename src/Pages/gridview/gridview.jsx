// import React from "react";
// import "../gridview/gridcss.css"; 
// import VerticalTab from "./VerticalTab"; 
// import ProductGrid from "./productgrid";

// function Gridview() {
//   return (
//     <>
//       <div > 
//       <ProductGrid />
//       </div>
//     </>
//   );
// }

// export default Gridview;





import React from "react";
import "../gridview/gridcss.css"; 
import ProductGrid from "./productgrid";
import { useLocation } from "react-router-dom";

function Gridview() {
   const location = useLocation();
  const title = location.state?.title;
  return (
    <>
      <div style={{ backgroundColor: "#efefef" }}> 
        <section className=" ">
          <div className="container-fluid">
          
               
             <ProductGrid landType = {title} />
           
          </div>
        </section> 
      </div>
    </>
  );
}

export default Gridview;
