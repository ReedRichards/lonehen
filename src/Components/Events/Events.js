import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import HomeNav from '../HomeNav/HomeNav.js';

class Events extends Component {
    render() {
        return (
            <div >
              <Container className="pad-60">
                <Row >
                  <Col md="2" >
                    <div className="datebox">
                    <div>Apr</div>
                    <div>14</div>
                    </div>
                  </Col>
                  <Col md="10" >
                    <h3 >Groovy Grape Wine Walk Lone Hen</h3>
                    <p > Saturday Apr 14, 2018 </p>
                    <p >1:00 pm - 6:00 pm</p>
                    <p>Come visit us in fabulous downtown navasota</p>
                  </Col>
                </Row>
              </Container>
            </div>
        );
    }
}

export default Events;
