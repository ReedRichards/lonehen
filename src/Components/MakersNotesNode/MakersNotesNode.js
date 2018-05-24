import React from "react";
import { Container, Row, Col } from "reactstrap";

const MakersNotesNode = props => {
  return (
    <Container className="pad-60 serif">
      <Row>
        <Col sm="12" md="4">
          <img className="img-fluid" src={props.image} alt={props.title} />
        </Col>
        <Col sm="12" md="8">
          <h3>{props.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: props.description }} />
        </Col>
      </Row>
    </Container>
  );
};

export default MakersNotesNode;
