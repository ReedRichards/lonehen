import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import MakersNotesNode from "../../Components/MakersNotesNode/MakersNotesNode.js";

const baseAPIURL = "https://api.bvzzdesign.com/lonehen";
class MakersNotes extends Component {
  constructor(props) {
    super(props);
    this.state = { makers: [] };
  }

  componentDidMount() {
    fetch(baseAPIURL + "/makersnotes/")
      .then(response => response.json())
      .then(data => this.setState({ makers: data }));
  }
  render() {
    return (
      <Container className="pad-60">
        <Row>
          {this.state.makers.map(m => (
            <MakersNotesNode
              title={m.item_title}
              image={m.wine_image}
              description={m.item_description}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

export default MakersNotes;
