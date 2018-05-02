import React, { PureComponent } from "react";
import { Container, Row, Button } from "reactstrap";
import AdminShopItem from "./AdminShopItem/AdminShopItem.js";
import AdminShopSubmit from "./AdminShopSubmit/AdminShopSubmit.js";
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoneAPi from "../../../loneApi.js";

const API = new LoneAPi();

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";

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

  fileChangedHandler(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      this.setState({ pressImage: reader.result });
    };
    reader.readAsDataURL(file);
  }
  handleChange(event, key) {
    this.setState({ [key]: event.target.value });
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

  render() {
    let store = null;
    if (this.state.store) {
      store = this.state.store.map(s => (
        <AdminShopItem
          key={s.id}
          id={s.id}
          name={s.name}
          image={s.image}
          price={s.price}
          category={s.category}
          description={s.description}
          raw_description={s.raw_description}
          handleChange={this.handleChange}
          mtoggle={this.mtoggle}
        />
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
          <h2>Sumbmit new item</h2>
          <AdminShopSubmit />
          <h2>Edit or delete posts</h2>
          <div>{store}</div>
        </Row>
      </Container>
    );
  }
}
