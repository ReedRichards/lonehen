import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import EventNode from "./EventNode/EventNode.js";

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }
  componentDidMount() {
    fetch(baseAPIURL + "/event/")
      .then(response => response.json())
      .then(data => this.setState({ events: data }));
  }

  render() {
    const { events } = this.state;
    return (
      <Container className="fluid mt-5">
        <Row>
          <Col>
            <h1>Events</h1>
          </Col>
        </Row>
        <Row>
          {events
            .map(event => (
              <EventNode
                title={event.event_title}
                startDate={event.event_start_date}
                endDate={event.event_end_date}
                startTime={event.event_start_time}
                endTime={event.event_end_time}
                details={event.event_details}
              />
            ))
            .reverse()}
        </Row>
      </Container>
    );
  }
}

export default Events;
