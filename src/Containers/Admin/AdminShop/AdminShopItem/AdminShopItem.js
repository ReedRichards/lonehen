import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

import RichTextEditor from "../../../RichTextEditor/RichTextEditor.js";

const adminShopItem = props => {
  return (
    <Col sm="12" className="mt-5  border-top">
      <Col sm="12" md="6" className="mt-5">
        <label>Item Name:</label>
        <input
          className="form-control"
          value={props.name}
          onChange={event => props.handleChange(event, "shopName")}
        />
      </Col>
      <Col sm="12" md="6">
        <label>Upoload an Image:</label>
        <img className="shop-admin-image" alt="shop" src={props.image} />
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
          value={props.quantity}
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
          value={props.price}
          min="0.01"
          step="0.01"
          max="2500"
        />
      </Col>
      <Col sm="12" md="6">
        <label>Category:</label>
        <input
          value={props.category}
          className="form-control"
          onChange={event => props.handleChange(event, "shopCategory")}
        />
      </Col>

      <Col sm="12" className="pd-5">
        <RichTextEditor
          post={props.quickAdd}
          deleteBool={true}
          description={props.raw_description}
          destination={"shop/" + props.id}
        />
      </Col>
    </Col>
  );
};

export default adminShopItem;
