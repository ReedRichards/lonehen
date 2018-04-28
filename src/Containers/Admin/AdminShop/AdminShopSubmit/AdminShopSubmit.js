import React, { PureComponent } from "react";
import RichTextEditor from "../../../RichTextEditor/RichTextEditor.js";
import { Container, Row, Col, Button } from "reactstrap";

import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoneAPi from "../../../../loneApi.js";
const API = new LoneAPi();
export default class AdminShopSubmit extends PureComponent {
  constructor(props) {
    super(props);
    this.mtoggle = this.mtoggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      modal: false
    };
  }
  mtoggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChange(event, key) {
    this.setState({ [key]: event.target.value });
  }
  fileChangedHandler(event, keyVal) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ [keyVal]: reader.result });
    };
    reader.readAsDataURL(file);
  }

  quickAdd = (rawvalue, value, destination) => {
    let payload = {};
    const param = { target: { value: "" } };

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

        this.handleChange(param, "blogTitle");
        this.handleChange(param, "blogDate");
        break;
      case "press":
        payload = {
          press_image: this.state.pressImage,
          press_descritption: value,
          press_raw: rawvalue
        };
        this.handleChange(param, "pressImage");
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
        this.handleChange(param, "eventTitle");
        this.handleChange(param, "eventStartDate");
        this.handleChange(param, "eventEndDate");
        this.handleChange(param, "eventStartTime");
        this.handleChange(param, "eventEndTime");
        API.post(destination, this.state.token, payload);
        break;
      case "shop":
        payload = {
          name: this.state.shopName,
          image: this.state.shopImage,
          quantity: this.state.shopQuantity,
          price: this.state.shopPrice,
          category: this.state.shopCategory,
          description: value,
          raw_description: rawvalue
        };
        API.post(destination, this.state.token, payload);
        break;

      default:
        console.log("should never happen admin line 140");
    }

    this.mtoggle();
  };

  render() {
    return (
      <Row>
        <Modal
          isOpen={this.state.modal}
          toggle={this.mtoggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.mtoggle}>Post Successful</ModalHeader>
          <ModalBody>
            <Alert color="success">Your post was successful</Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.mtoggle}>
              Done
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <Col sm="12">
          <Col sm="12" md="6">
            <label>Item Name:</label>
            <input
              className="form-control"
              onChange={event => this.handleChange(event, "shopName")}
            />
          </Col>
          <div className="form-group">
            <label>Upoload an Image:</label>
            <input
              onChange={event => this.fileChangedHandler(event, "shopImage")}
              className="form-control"
              type="file"
            />
          </div>
          <Col sm="12" md="6">
            <label>Quantity:</label>
            <input
              className="form-control"
              onChange={event => this.handleChange(event, "shopQuantity")}
              type="number"
            />
          </Col>
          <Col sm="12" md="6">
            <label>Price:</label>
            <input
              className="form-control"
              onChange={event => this.handleChange(event, "shopPrice")}
              type="number"
              min="0.01"
              step="0.01"
              max="2500"
            />
          </Col>
          <Col sm="12" md="6">
            <label>Category:</label>
            <input
              className="form-control"
              onChange={event => this.handleChange(event, "shopCategory")}
            />
          </Col>
          <RichTextEditor
            quick={true}
            post={this.quickAdd}
            destination="shop"
          />
        </Col>
      </Row>
    );
  }
}
