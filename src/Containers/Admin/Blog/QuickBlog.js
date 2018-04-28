import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import LoneAPi from "../../../loneApi.js";
import RichTextEditor from "../../RichTextEditor/RichTextEditor.js";

const API = new LoneAPi();

export default class QuickBlog extends Component {
  render() {
    return (
      <Col sm="12">
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            onChange={event => this.props.change(event, "blogTitle")}
          />
          <label>Date:</label>
          <input
            className="form-control"
            onChange={event => this.props.change(event, "blogDate")}
            type="date"
          />
        </div>
        <RichTextEditor post={this.props.quickPost} destination="blog" />
      </Col>
    );
  }
}
