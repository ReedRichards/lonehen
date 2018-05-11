import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import { Col, Button, Table } from "reactstrap";
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
    this.changeQuant = this.changeQuant.bind(this);
  }

  ctoggle() {
    this.setState({
      cmodal: !this.state.cmodal
    });
  }
  addToCart(id) {
    let cart = [...this.state.cart];
    if (!cart.includes(id)) {
      id.amount = 1;
      cart.push(id);
    }

    this.setState({ cart: cart });
  }
  changeQuant(id, mod) {
    const oldstate = [...this.state.cart];
    const found = oldstate.find(element => {
      if (element.id === id) {
        return element;
      }
    });
    const index = oldstate.indexOf(found);
    if (mod === "plus") {
      found.amount++;
    } else if (mod === "minus") {
      if (found.amount > 1) {
        found.amount--;
      }
    }
    this.setState({ cart: oldstate });
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.cmodal}
          toggle={this.ctoggle}
          className="modal-lg"
        >
          <ModalHeader toggle={this.ctoggle}>Your Cart</ModalHeader>
          <Table>
            <thead>
              <th>Product</th>
              <th>Quanity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </thead>
            <tbody>
              {this.state.cart.map(c => (
                <tr>
                  <td>{c.name}</td>
                  <td>
                    {" "}
                    <i
                      className="fas fa-minus"
                      onClick={() => this.changeQuant(c.id, "minus")}
                    />{" "}
                    {c.amount}{" "}
                    <i
                      className="fas fa-plus"
                      onClick={() => this.changeQuant(c.id, "plus")}
                    />
                  </td>
                  <td>{c.price}</td>
                  <td> {(c.price * c.amount).toFixed(2)}</td>
                  <i className="fas fa-times" />
                </tr>
              ))}
              <tr>
                <td />
                <td />
                <th>Total:</th>
                <td>
                  {/* not super sure that this is readable so in case i ever come
              back to it, this is a ternary expression that evalutates whether
             or not the length of the array of this.cart is greater or one,
             which it wont be until someone add an item to the cart.  if the
             length is greater than 0, take the sum of all cart items price and
             and amount and return that.  that, 0 needs to be there so that an
             object is not returned from the reducer, and that also needs to be
             a fixed decimal to two places, hence the two fixed, if the cart
             has no items return null*/}
                  {this.state.cart.length > 0
                    ? this.state.cart
                        .reduce((acc, val) => acc + val.price * val.amount, 0)
                        .toFixed(2)
                    : null}
                </td>
              </tr>
            </tbody>
          </Table>
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
