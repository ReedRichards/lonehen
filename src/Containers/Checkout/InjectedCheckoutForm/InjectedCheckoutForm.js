import React from "react";
import { injectStripe } from "react-stripe-elements";
import { CardElement } from "react-stripe-elements";

import { Col, Button } from "reactstrap";

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";
class CheckoutForm extends React.Component {
  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    const token = this.props.stripe
      .createToken({ name: "Jenny Rosen" })
      .then(({ token }) => {
        console.log(token);
        const payload = {
          total: 999,
          token: token.id
        };
        let response = fetch(baseAPIURL + "/checkout/", {
          method: "POST",
          headers: new Headers({
            accept: "application/json",
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(payload)
        });
      });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    return (
      <Col sm="12">
        <form onSubmit={this.handleSubmit}>
          <Col>Total: {this.props.total}</Col>

          <CardElement style={{ base: { fontSize: "18px" } }} />

          <Col>
            <Button color="primary">Checkout</Button>
          </Col>
        </form>
      </Col>
    );
  }
}

export default injectStripe(CheckoutForm);
