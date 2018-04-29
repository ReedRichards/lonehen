import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ShopItem from "./ShopItem/ShopItem.js";

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";
class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = { shop: [] };
  }
  componentDidMount() {
    fetch(baseAPIURL + "/shop/")
      .then(response => response.json())
      .then(data => this.setState({ shop: data }));
  }

  render() {
    const { shop } = this.state;
    return (
      <Container className="fluid mt-5">
        <Row>
          <Col>
            <h1>Shop</h1>
          </Col>
        </Row>
        <Row>
          {shop
            .map(s => (
              <ShopItem
                key={s.id}
                name={s.name}
                image={s.image}
                quantity={s.quantity}
                price={s.price}
                category={s.category}
                description={s.description}
                raw_description={s.raw_description}
              />
            ))
            .reverse()}
        </Row>
      </Container>
    );
  }
}

export default Shop;
