import React, { Component } from "react";
import { Elements } from "react-stripe-elements";

import InjectedCheckoutForm from "./InjectedCheckoutForm/InjectedCheckoutForm.js";

import { Container, Row, Col } from "reactstrap";
export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null
    };
  }

  componentWillMount() {
    if (this.props.items.length > 0) {
      let total = this.props.items.map(i => parseFloat(i.price));
      total = total.reduce((acc, val) => {
        return acc + val;
      });
      this.setState({ total: total.toFixed(2) });
    }
  }
  render() {
    return (
      <Container>
        <Row>
          {this.props.items.map(i => {
            return (
              <Col className="d-flex flex-row" sm="12">
                <Col sm="4">
                  <img className="img-fluid" src={i.image} alt={i.name} />
                </Col>
                <Col sm="4">{i.name}</Col>
                <Col sm="4">{i.amount}</Col>
                <Col sm="4">{i.price}</Col>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Elements>
            <InjectedCheckoutForm total={this.state.total} />
          </Elements>
        </Row>
      </Container>
    );
  }
}
