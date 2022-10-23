import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./style.css"
/**
* @author
* @function Footer
**/

export const Footer = (props) => {
  return (
    
      <div className="main-footer">
      <div className="container"> 
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );

 
  

}