import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";
export default class ShopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {
        image: null,
        name: null,
        quantity: null,
        price: null,
        category: null,
        description: null
      }
    };
  }
  componentDidMount() {
    fetch(baseAPIURL + "/shop/" + this.props.match.params.id + "/")
      .then(response => response.json())
      .then(data => {
        this.setState({ store: data });
        console.log(data);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md="6">
            <img
              className="img-fluid"
              src={this.state.store.image}
              alt="placeholoder"
            />
          </Col>
          <Col
            sm="12"
            md="6"
            className="d-flex  flex-column justify-content-center align-items-right"
          >
            <h3>${this.state.store.price}</h3>
            <h3>{this.state.store.name}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.store.description }}
            />

            <Button onClick={this.props.addToCart} color="primary">
              Add To Cart
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
