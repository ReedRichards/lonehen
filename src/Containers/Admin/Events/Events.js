import React, { PureComponent } from "react";
import { Alert } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Row, Col, Button } from "reactstrap";
import RichTextEditor from "../../RichTextEditor/RichTextEditor.js";
import LoneAPi from "../../../loneApi.js";

const API = new LoneAPi();
const baseAPIURL = "https://api.bvzzdesign.com/lonehen";

// the beggining of figureing this out
Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
export default class EventsAdmin extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.mtoggle = this.mtoggle.bind(this);
    this.deltoggle = this.deltoggle.bind(this);
    this.state = {
      events: [],
      modal: false
    };
  }

  mtoggle(dest, id) {
    this.setState({
      modal: !this.state.modal,
      destination: dest,
      idnum: id
    });
  }
  componentWillMount() {
    const cookie = this.getCookie("token");
    if (cookie) {
      this.setState({ token: cookie });
    }
  }
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2)
      return parts
        .pop()
        .split(";")
        .shift();
  }
  componentDidMount() {
    fetch(baseAPIURL + "/event/")
      .then(response => response.json())
      .then(data => this.setState({ events: data }));
  }
  quickAdd = (rawvalue, value, destination) => {
    //find the correct event
    let payload = {};

    var afterSlash = destination.substr(destination.indexOf("/") + 1);
    let newevents = [...this.state.events];
    //weakly typed to the rescue, == is intentional
    let index = this.state.events.findIndex(i => i.id == afterSlash);
    console.log(newevents[index]);

    //prepares dates for proper api format
    var eventStart = new Date(newevents[index].event_start_date);
    const isoStartDate = eventStart.toISOString();
    var eventEnd = new Date(newevents[index].event_end_date);
    const isoEndDate = eventEnd.toISOString();
    newevents[index].event_start_date = isoStartDate;
    newevents[index].event_end_date = isoEndDate;

    // payload = {
    //   event_title: this.state.eventTitle,
    //   event_start_date: isoStartDate,
    //   event_start_time: this.state.eventStartTime,
    //   event_end_date: isoEndDate,
    //   event_end_time: this.state.eventEndTime,
    //   event_raw: rawvalue,
    //   event_details: value
    // };
    API.patch(destination, this.state.token, newevents[index]);
  };
  deltoggle() {
    API.delete(this.state.destination, this.state.token);
    this.mtoggle();
    let newevents = [...this.state.events];
    let index = this.state.events.findIndex(e => e.id === this.state.idnum);
    newevents.splice(index, 1);
    console.log(newevents === this.state.events);
    this.setState({ events: newevents });
  }
  handleChange(event, key, e) {
    let newevents = [...this.state.events];
    let index = this.state.events.findIndex(i => i === e);
    newevents[index][key] = event.target.value;
    this.setState({ events: newevents });
  }

  render() {
    return (
      <Container>
        <Modal
          isOpen={this.state.modal}
          toggle={this.mtoggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.mtoggle}>Delete Post</ModalHeader>
          <ModalBody>
            <Alert color="danger">
              warning, your are about to delete your post and will not be able
              to recover it, do you wish to continue?
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.mtoggle}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={this.deltoggle}>
              Delete
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Row className="mt-5">
          <Col className="pd-5">
            <h2>Edit or delete an Event</h2>
          </Col>
          <div>
            {this.state.events.map(e => (
              <Col sm="12" key={e.id} className="border-bottom mb-5">
                <Col sm="12" className="">
                  <label>Event Title:</label>
                  <input
                    value={e.event_title}
                    className="form-control"
                    onChange={event =>
                      this.handleChange(event, "event_title", e)
                    }
                  />
                </Col>
                <Row className="ml-0 mr-0">
                  <Col sm="12" md="4" className="">
                    <label>Start Date:</label>
                    <input
                      value={new Date(e.event_start_date).toDateInputValue()}
                      className="form-control"
                      onChange={event =>
                        this.handleChange(event, "event_start_date", e)
                      }
                      type="date"
                    />
                  </Col>

                  <Col sm="12" md="4" className="">
                    <label>Time:</label>
                    <input
                      value={e.event_start_time}
                      placeholder="10:00 am"
                      className="form-control"
                      onChange={event =>
                        this.handleChange(event, "event_start_time", e)
                      }
                    />
                  </Col>
                </Row>
                <Row className="ml-0 mr-0">
                  <Col sm="12" md="4" className="">
                    <label>End Date:</label>
                    <input
                      value={new Date(e.event_end_date).toDateInputValue()}
                      className="form-control"
                      onChange={event =>
                        this.handleChange(event, "event_end_date", e)
                      }
                      type="date"
                    />
                  </Col>
                  <Col sm="12" md="4" className="">
                    <label>End Time:</label>
                    <input
                      value={e.event_end_time}
                      className="form-control"
                      onChange={event =>
                        this.handleChange(event, "event_end_time", e)
                      }
                      placeholder="4:00 pm"
                    />
                  </Col>
                </Row>
                <Col sm="12" className="p-5">
                  <RichTextEditor
                    post={this.quickAdd}
                    deleteBool={true}
                    del={this.mtoggle}
                    id={e.id}
                    description={e.event_raw}
                    destination={"event/" + e.id}
                  />
                </Col>
              </Col>
            ))}
          </div>
        </Row>
      </Container>
    );
  }
}
