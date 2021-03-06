import React, { PureComponent } from "react";
import { Container, Row, Button } from "reactstrap";
import { Col } from "reactstrap";
import RichTextEditor from "../../RichTextEditor/RichTextEditor.js";
import AdminShopSubmit from "./AdminShopSubmit/AdminShopSubmit.js";
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoneAPi from "../../../loneApi.js";

const API = new LoneAPi();

const baseAPIURL = "https://api.bvzzdesign.com/lonehen";

export default class AdminShop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      store: false,
      modal: false
    };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mtoggle = this.mtoggle.bind(this);
    this.deltoggle = this.deltoggle.bind(this);
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
    let newevents = [...this.state.store];
    let index = this.state.store.findIndex(e => e.id === this.state.idnum);
    newevents.splice(index, 1);
    this.setState({ store: newevents });
  }

  fileChangedHandler(event, stName) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({ [stName]: reader.result });
    };
    reader.readAsDataURL(file);
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
    fetch(baseAPIURL + "/shop/")
      .then(response => response.json())
      .then(data => this.setState({ store: data }));
  }

  handleChange(event, key, e) {
    let newevents = [...this.state.store];
    let index = this.state.store.findIndex(i => i === e);
    newevents[index][key] = event.target.value;
    this.setState({ store: newevents });
  }
  quickAdd = (rawvalue, value, destination) => {
    let payload = {};
    var afterSlash = destination.substr(destination.indexOf("/") + 1);
    let store = [...this.state.store];
    //weakly typed to the rescue, == is intentional
    let index = this.state.store.findIndex(i => i.id == afterSlash);

    if (this.state[destination]) {
      store[index].image = this.state[destination];
    }

    API.patch(destination, this.state.token, store[index]);
    // need a function so setstate like this
    this.setState({ store });
  };
  render() {
    let store = null;
    if (this.state.store) {
      store = this.state.store.map(s => (
        <Col key={s.id} sm="12" className="mt-5  border-top">
          <Col sm="12" md="6" className="mt-5">
            <label>Item Name:</label>
            <input
              className="form-control"
              value={s.name}
              onChange={event => this.handleChange(event, "name", s)}
            />
          </Col>
          <Col sm="12" md="6">
            <label>Upoload an Image:</label>
            <img className="shop-admin-image" alt="shop" src={s.image} />
            {/* TODO  add proper alts*/}
            <input
              alt="shop"
              onChange={event => this.fileChangedHandler(event, "shop/" + s.id)}
              className="form-control"
              type="file"
            />
          </Col>
          <Col sm="12" md="6">
            <label>Quantity:</label>
            <input
              className="form-control"
              value={s.quantity}
              onChange={event => this.handleChange(event, "quantity", s)}
              type="number"
            />
          </Col>
          <Col sm="12" md="6">
            <label>Price:</label>
            <input
              className="form-control"
              onChange={event => this.handleChange(event, "price", s)}
              type="number"
              value={s.price}
              min="0.01"
              step="0.01"
              max="2500"
            />
          </Col>
          <Col sm="12" md="6">
            <label>Category:</label>
            <input
              value={s.category}
              className="form-control"
              onChange={event => this.handleChange(event, "category", s)}
            />
          </Col>

          <Col sm="12" className="pd-5">
            <RichTextEditor
              post={this.quickAdd}
              deleteBool={true}
              del={this.mtoggle}
              description={s.raw_description}
              destination={"shop/" + s.id}
              id={s.id}
            />
          </Col>
        </Col>
      ));
    }
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

        <Row>
          <h2>Edit or delete posts</h2>
          {store}
        </Row>
      </Container>
    );
  }
}
