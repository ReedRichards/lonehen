import React, { Component } from "react";
import { Col } from "reactstrap";
import RichTextEditor from "../../../RichTextEditor/RichTextEditor.js";

export default class AdminShopItem extends Component {
  render() {
    return (
      <Col sm="12" className="mt-5  border-top">
        <Col sm="12" md="6" className="mt-5">
          <label>Item Name:</label>
          <input
            className="form-control"
            value={this.props.name}
            onChange={event => props.handleChange(event, "shopName")}
          />
        </Col>
        <Col sm="12" md="6">
          <label>Upoload an Image:</label>
          <img className="shop-admin-image" alt="shop" src={this.props.image} />
          {/* TODO  add proper alts*/}
          <input
            alt="shop"
            onChange={event => props.fileChangedHandler(event, "shopImage")}
            className="form-control"
            type="file"
          />
        </Col>
        <Col sm="12" md="6">
          <label>Quantity:</label>
          <input
            className="form-control"
            value={this.props.quantity}
            onChange={event => props.handleChange(event, "shopQuantity")}
            type="number"
          />
        </Col>
        <Col sm="12" md="6">
          <label>Price:</label>
          <input
            className="form-control"
            onChange={event => props.handleChange(event, "shopPrice")}
            type="number"
            value={this.props.price}
            min="0.01"
            step="0.01"
            max="2500"
          />
        </Col>
        <Col sm="12" md="6">
          <label>Category:</label>
          <input
            value={this.props.category}
            className="form-control"
            onChange={event => props.handleChange(event, "shopCategory")}
          />
        </Col>

        <Col sm="12" className="pd-5">
          <RichTextEditor
            post={this.props.quickAdd}
            deleteBool={true}
            del={props.mtoggle}
            description={this.props.raw_description}
            destination={"shop/" + this.props.id}
            id={this.props.id}
          />
        </Col>
      </Col>
    );
  }
}
