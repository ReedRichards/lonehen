import React, { PureComponent } from "react";
import RichTextEditor from "../../RichTextEditor/RichTextEditor.js";
import { Container, Row, Col, Button } from "reactstrap";
import AdminShopItem from "./AdminShopItem/AdminShopItem.js";
import AdminShopSubmit from "./AdminShopSubmit/AdminShopSubmit.js";

const baseAPIURL = "http://api.bvzzdesign.com/lonehen";

export default class AdminShop extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { store: false };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
          name={s.name}
          image={s.image}
          price={s.price}
          category={s.category}
          description={s.description}
          raw_description={s.raw_description}
          handleChange={this.handleChange}
        />
      ));
    }
    return (
      <Container>
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
