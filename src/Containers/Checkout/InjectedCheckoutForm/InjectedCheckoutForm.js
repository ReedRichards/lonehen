import React from "react";
import { injectStripe } from "react-stripe-elements";
import { CardElement } from "react-stripe-elements";

import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Col, Row } from "reactstrap";

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, key) {
    this.setState({ [key]: event.target.value });
  }

  handleSubmit = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    console.log(this.state);
    return 0;
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
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  name="firstName"
                  id="firstName"
                  onChange={event => this.handleChange(event, "firstName")}
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  onChange={event => this.handleChange(event, "lastName")}
                  name="lastName"
                  id="lastName"
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              onChange={event => this.handleChange(event, "email")}
              type="email"
              name="email"
              id="exampleEmail"
            />
          </FormGroup>

          <FormGroup>
            <Label for="address1">Address Line 1</Label>
            <Input
              name="address1"
              id="address1"
              onChange={event => this.handleChange(event, "address1")}
            />
          </FormGroup>

          <FormGroup>
            <Label for="address2">Address Line 2 (optional)</Label>
            <Input
              name="address2"
              id="address2"
              onChange={event => this.handleChange(event, "address1")}
            />
          </FormGroup>

          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="state">State</Label>
                <Input type="select" name="state" id="state" placeholder="">
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label for="zipCode">Zip</Label>
                <Input name="zipCode" id="zipCode" placeholder="" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="my-5">
              <Label>Credit Card Info</Label>
              <CardElement style={{ base: { fontSize: "18px" } }} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button color="primary">Checkout</Button>
            </Col>
          </Row>
        </form>
      </Col>
    );
  }
}

export default injectStripe(CheckoutForm);
