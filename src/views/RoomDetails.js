import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Container, Row, Col, Badge, Card, CardBody, CardImg, CardTitle, CardText, Button, Spinner } from 'reactstrap';

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

import SimpleFooter from "components/Footers/SimpleFooter.js";



class RoomDetails extends React.Component {
    componentDidMount() {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.main.scrollTop = 0;
    }
    render() {
      return (
        <>
          <DemoNavbar />
          <main ref="main">




            </main>
        <SimpleFooter />
        
      </>
    );
  }
}
export default RoomDetails;