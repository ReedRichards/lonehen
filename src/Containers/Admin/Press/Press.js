import React, { PureComponent } from "react";
import { Alert, Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import RichTextEditor from "../../RichTextEditor/RichTextEditor.js";

import LoneAPi from "../../../loneApi.js";

const API = new LoneAPi();
const baseAPIURL = "http://api.bvzzdesign.com/lonehen";

export default class Press extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      press: false,
      reset: true,
      modal: false,
      pmodal: false
    };
    this.mtoggle = this.mtoggle.bind(this);
    this.ptoggle = this.ptoggle.bind(this);
    this.deltoggle = this.deltoggle.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }
  fileChangedHandler(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({ pressImage: reader.result });
    };
    reader.readAsDataURL(file);
  }
  componentWillMount() {
    const cookie = this.getCookie("token");
    if (cookie) {
      this.setState({ token: cookie });
    }
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
    let newevents = [...this.state.press];
    let index = this.state.press.findIndex(e => e.id === this.state.idnum);
    newevents.splice(index, 1);
    console.log(newevents === this.state.press);
    this.setState({ press: newevents });
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
    fetch(baseAPIURL + "/press/")
      .then(response => response.json())
      .then(data => this.setState({ press: data }));
  }
  ptoggle() {
    this.setState({
      pmodal: !this.state.pmodal
    });
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
        console.log(this.state.reset);
        this.setState({ reset: !this.state.reset });
        console.log(this.state.reset);
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
    this.ptoggle();
  };

  render() {
    let press = null;
    if (this.state.press) {
      press = this.state.press.map(p => (
        <Col sm="12" className="p-5">
          <Col
            sm={{ size: 6, offset: 3 }}
            className="d-flex press-image  justify-content-center mb-5"
          >
            <img className="img-fluid" src={p.press_image} alt="" />
          </Col>

          <Col sm="12" className="p-5">
            <RichTextEditor
              post={this.quickAdd}
              del={this.mtoggle}
              id={p.id}
              deleteBool={true}
              description={p.press_raw}
              destination={"press/" + p.id}
            />
          </Col>
        </Col>
      ));
    }
    return (
      <Container>
        <Modal
          isOpen={this.state.pmodal}
          toggle={this.ptoggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.ptoggle}>Post Successful</ModalHeader>
          <ModalBody>
            <Alert color="success">Your post was successful</Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.ptoggle}>
              Done
            </Button>{" "}
          </ModalFooter>
        </Modal>
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
        <Row>
          <Col xs="12" className=" p-5">
            <h1>Edit or Delete press releaess</h1>
            <div>{press}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}
