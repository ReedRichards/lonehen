import React from "react";
const baseAPIURL = "https://api.bvzzdesign.com/lonehen";

export default class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch(baseAPIURL + "/event/" + this.props.match.params.id + "/")
      .then(response => response.json())
      .then(data => this.setState({ events: data }));
  }
  render() {
    return <div>{this.state.events.event_title}</div>;
  }
}
