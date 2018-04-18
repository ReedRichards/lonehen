import React, { Component } from 'react';
import './App.css';

import HomeCarousel from './Containers/HomeCarousel/HomeCarousel.js';
import HomeNav from './Components/HomeNav/HomeNav.js';

import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
        <div >
          <Container fluid id="hero">
            <Container fluid className="screen">
              <HomeNav/>
            </Container>
          </Container>



          <Container>
            <Row>
              <Col sm="12" md="8">text</Col>
              <Col sm="12" md="4">text</Col>

            </Row>
          </Container>
          <HomeCarousel/>

          <Container >
            <Row >
              <Col sm="12" md="4">text</Col>
              <Col sm="12" md="4">text</Col>
              <Col sm="12" md="4">text</Col>

            </Row>

          </Container>


        </div>

    );
  }
}

export default App;
