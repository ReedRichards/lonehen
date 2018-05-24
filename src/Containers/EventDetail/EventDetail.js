import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const baseAPIURL = "https://api.bvzzdesign.com/lonehen";

export default class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch(baseAPIURL + "/event/" + this.props.match.params.id + "/")
      .then(response => response.json())
      .then(data => this.setState({ events: data }));
  }
  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" className="text-center my-5 ">
            <h2>{this.state.events.event_title}</h2>
          </Col>
          <Col md="4">
            <Link className="dark" to="/events">
              <i className="fas fa-arrow-left" /> Back to events
            </Link>
          </Col>
          <Col md="8">
            <h4>
              {" "}
              {new Date(this.state.events.event_start_date).toLocaleString(
                "en-us",
                {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }
              )}{" "}
              -{" "}
              {new Date(this.state.events.event_end_date).toLocaleString(
                "en-us",
                {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }
              )}{" "}
            </h4>
            <p>
              {this.state.events.event_start_time} -{" "}
              {this.state.events.event_end_time}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: this.state.events.event_details
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
