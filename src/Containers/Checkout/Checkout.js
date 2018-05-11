import React, { Component } from "react";
import { Elements } from "react-stripe-elements";

import InjectedCheckoutForm from "./InjectedCheckoutForm/InjectedCheckoutForm.js";

import { Container, Row, Col, Table } from "reactstrap";
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
          <Table>
            <thead>
              <th>Product</th>
              <th>Quanity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </thead>
            <tbody>
              {this.props.items.map(i => {
                return (
                  <tr>
                    <td>
                      <img
                        className="checkout-image"
                        src={i.image}
                        alt={i.name}
                      />
                      {i.name}
                    </td>
                    <td>{i.amount}</td>
                    <td>{i.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
