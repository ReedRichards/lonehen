import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import { Col, Button } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./Containers/HomePage/HomePage.js";
import Events from "./Components/Events/Events.js";
import Shop from "./Containers/Shop/Shop.js";
import ShopDetail from "./Containers/Shop/ShopDetail/ShopDetail.js";
import EventsDetail from "./Components/Events/EventDetail/EventDetail.js";
import HomeNav from "./Components/HomeNav/HomeNav.js";
import MakersNotes from "./Components/MakersNotes/MakersNotes.js";
import Blog from "./Components/Blog/Blog.js";
import Checkout from "./Containers/Checkout/Checkout.js";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmodal: false,
      cart: []
    };

    this.ctoggle = this.ctoggle.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  ctoggle() {
    this.setState({
      cmodal: !this.state.cmodal
    });
  }
  addToCart(id) {
    let cart = [...this.state.cart];
    id.amount = 1;
    cart.push(id);

    this.setState({ cart: cart });
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.cmodal}
          toggle={this.ctoggle}
          className="modal-lg"
        >
          <ModalHeader toggle={this.ctoggle}>Modal title</ModalHeader>
          {this.state.cart.map(c => (
            <div>
              <Col sm="12">{c.name}</Col>
              <hr />
              <Col sm="12" className="d-flex flex-row">
                <Col sm="3">
                  <i className="fas fa-minus" /> {c.amount}{" "}
                  <i className="fas fa-plus" />
                </Col>
                <Col className="text-right" sm="3">
                  {c.price}
                </Col>
                <Col sm="1">
                  <i className="fas fa-times" />
                </Col>
              </Col>
              <hr />
            </div>
          ))}
          <ModalFooter>
            <Button color="primary" onClick={this.ctoggle}>
              Checkout
            </Button>{" "}
            <Button color="secondary" onClick={this.ctoggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Router>
          <div>
            <Route
              path="/"
              render={() => <HomeNav {...this.props} ctoggle={this.ctoggle} />}
            />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/events/:id" component={EventsDetail} />
            <Route exact path="/events" component={Events} />
            <Route
              exact
              path="/shop"
              render={() => <Shop {...this.props} add={this.addToCart} />}
            />
            <Route exact path="/shop/:name/:id" component={ShopDetail} />
            <Route exact path="/makers-notes" component={MakersNotes} />
            <Route exact path="/blog" component={Blog} />
            <Route
              exact
              path="/shop/checkout"
              render={() => (
                <Checkout {...this.props} items={this.state.cart} />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}
