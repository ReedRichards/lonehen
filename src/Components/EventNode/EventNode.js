import React from "react";
import { Container, Row, Col } from "reactstrap";
const EventNode = props => {
  return (
    <Container className="pad-60 serif">
      <Row>
        <Col md="2">
          <div className="dflex flex-column justify-content center datebox pd-5">
            <Col className="text-center">
              {" "}
              {new Date(props.startDate)
                .toLocaleString("en-us", {
                  month: "short"
                })
                .toUpperCase()}
            </Col>
            <Col className="text-center">
              {" "}
              {new Date(props.startDate).toLocaleString("en-us", {
                day: "numeric"
              })}
            </Col>
          </div>
        </Col>
        <Col md="10">
          <h2>{props.title}</h2>
          <h4>
            {" "}
            {new Date(props.startDate).toLocaleString("en-us", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric"
            })}{" "}
            -{" "}
            {new Date(props.endDate).toLocaleString("en-us", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric"
            })}{" "}
          </h4>
          <p>
            {props.startTime} - {props.endTime}
          </p>
          <div dangerouslySetInnerHTML={{ __html: props.details }} />
        </Col>
      </Row>
    </Container>
  );
};
export default EventNode;
