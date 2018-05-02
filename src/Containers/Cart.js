import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Row, Col, Button } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Containers/HomePage/HomePage.js";
import Login from "./Containers/Login/Login.js";
import Events from "./Components/Events/Events.js";
import Shop from "./Containers/Shop/Shop.js";
import ShopDetail from "./Containers/Shop/ShopDetail/ShopDetail.js";
import EventsDetail from "./Components/Events/EventDetail/EventDetail.js";
import HomeNav from "./Components/HomeNav/HomeNav.js";
import MakersNotes from "./Components/MakersNotes/MakersNotes.js";
import Blog from "./Components/Blog/Blog.js";
import Admin from "./Containers/Admin/Admin.js";
import Home from "./Containers/Admin/Home/Home.js";
import Press from "./Containers/Admin/Press/Press.js";

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmodal: false
    };

    this.ctoggle = this.ctoggle.bind(this);
  }

  ctoggle() {
    this.setState({
      cmodal: !this.state.cmodal
    });
  }

  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { ctoggle: this.ctoggle })
    );
    return (
      <div>
        <Modal
          isOpen={this.state.cmodal}
          toggle={this.ctoggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.ctoggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.ctoggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.ctoggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Route path="/" component={HomeNav} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/events/:id" component={EventsDetail} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/shop/:name/:id" component={ShopDetail} />
        <Route exact path="/makers-notes" component={MakersNotes} />
        <Route exact path="/blog" component={Blog} />
      </div>
    );
  }
}
