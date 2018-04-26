
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
const EventNode = (props) =>{
    return(
        <Container className="pad-60">
          <Row >
            <Col md="2" >
              <div className="datebox">
                <div>Apr</div>
                <div>14</div>
              </div>
            </Col>
            <Col md="10" >
              <h3 >{props.title}</h3>
              <p > {new Date(props.startDate).toLocaleString("en-us",{month:"short"})} - {new Date(props.endDate).toLocaleString("en-us",{month:"short"})} </p>
              <p >{props.startTime} - {props.endTime}</p>
              <div dangerouslySetInnerHTML={{__html: props.details}} />
            </Col>
          </Row>
        </Container>

    )
}
export default EventNode;
