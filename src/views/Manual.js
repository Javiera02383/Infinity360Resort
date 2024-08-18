import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Container, Row, Col, Badge, Card, CardBody, CardImg, CardTitle, CardText, Button, Spinner } from 'reactstrap';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

import SimpleFooter from "components/Footers/SimpleFooter.js";



class Manual extends React.Component {
    componentDidMount() {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.main.scrollTop = 0;
    }
    render() {
      return (
        <>
          
          <main ref="main">
          <div>
      {/* Iframe */}
      <iframe 
        src="https://app.tango.us/app/workflow/Manual-de-Usuario---INFINITY-360-RESORT-c835a950135240b699c9e998cd538d93" 
        width="100%" 
        height="1000px" 
        style={{ border: "none" }}>
      </iframe>
    </div>



            </main>
        
        
      </>
    );
  }
}
export default Manual;