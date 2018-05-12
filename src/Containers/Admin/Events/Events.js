import React, { PureComponent } from "react";
import { Alert } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Row, Col, Button } from "reactstrap";
import RichTextEditor from "../../RichTextEditor/RichTextEditor.js";
import LoneAPi from "../../../loneApi.js";

const API = new LoneAPi();
const baseAPIURL = "https://api.bvzzdesign.com/lonehen";

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
  deltoggle() {
    API.delete(this.state.destination, this.state.token);
    this.mtoggle();
    let newevents = [...this.state.events];
    let index = this.state.events.findIndex(e => e.id === this.state.idnum);
    newevents.splice(index, 1);
    console.log(newevents === this.state.events);
    this.setState({ events: newevents });
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
    let payload = {};

    switch (destination) {
      case "blog":
        var event = new Date(this.state.blogDate);
        const isoDate = event.toISOString();
        payload = {
          post_title: this.state.blogTitle,
          post_body: value,
          post_date: isoDate
        };
        API.post(destination, this.state.token, payload);
        break;
      case "press":
        payload = {
          press_image: this.state.pressImage,
          press_descritption: value,
          press_raw: rawvalue
        };
        API.post(destination, this.state.token, payload);
        break;
      case "event":
        var eventStart = new Date(this.state.eventStartDate);
        const isoStartDate = eventStart.toISOString();
        var eventEnd = new Date(this.state.eventEndDate);
        const isoEndDate = eventEnd.toISOString();

        payload = {
          event_title: this.state.eventTitle,
          event_start_date: isoStartDate,
          event_start_time: this.state.eventStartTime,
          event_end_date: isoEndDate,
          event_end_time: this.state.eventEndTime,
          event_raw: rawvalue,
          event_details: value
        };
        API.post(destination, this.state.token, payload);
        break;
      default:
        console.log("should never happen admin even line 104");
    }
    //sets state to re render component
    fetch(baseAPIURL + "/event/")
      .then(response => response.json())
      .then(data => this.setState({ events: data }));
  };
  handleChange(event, key) {
    this.setState({ [key]: event.target.value });
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
                    onChange={event => this.handleChange(event, "eventTitle")}
                  />
                </Col>
                <Row className="ml-0 mr-0">
                  <Col sm="12" md="4" className="">
                    <label>Start Date:</label>
                    <input
                      value={e.event_start_date}
                      className="form-control"
                      onChange={event =>
                        this.handleChange(event, "eventStartDate")
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
                        this.handleChange(event, "eventStartTime")
                      }
                    />
                  </Col>
                </Row>
                <Row className="ml-0 mr-0">
                  <Col sm="12" md="4" className="">
                    <label>End Date:</label>
                    <input
                      value={e.event_end_date}
                      className="form-control"
                      onChange={event =>
                        this.handleChange(event, "eventEndDate")
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
                        this.handleChange(event, "eventEndTime")
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
