import React from "react";

const BlogPosts = props => {
  return (
    <div>
      <h2>{props.title}</h2>
      <h4>
        {new Date(props.date).toLocaleString("en-us", { month: "short" })}{" "}
        {new Date(props.date).getUTCDate()},{" "}
        {new Date(props.date).getFullYear()}
      </h4>
    </div>
  );
};
export default BlogPosts;
