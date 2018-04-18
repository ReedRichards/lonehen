
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class MakersNotes extends Component {
    render() {
        return (
            <Container className="pad-60">
              <Row >
                <Col sm="12" md="4">
                  <img className="img-fluid" src="/static/img/BubblySquare.png"/>
                </Col>
                <Col sm="12" md="8">
                  <h3>Bubbly Wine</h3>
                  <p >desc</p>
                </Col>
              </Row>
            </Container>
        );
    }
}

export default MakersNotes;
