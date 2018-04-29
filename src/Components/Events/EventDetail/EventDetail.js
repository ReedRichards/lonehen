import React from "react";

const EventDetail = props => {
  return <div>{props.match.params.id}</div>;
};

export default EventDetail;
