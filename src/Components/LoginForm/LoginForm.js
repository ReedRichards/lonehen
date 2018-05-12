import React from "react";

const loginform = props => {
  return (
    <div>
      <label>
        UserName:
        <input
          type="text"
          value={props.username}
          onChange={event => props.onChangeUser(event)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={props.password}
          onChange={event => props.onChangePass(event)}
        />
      </label>
      <input type="submit" onClick={() => props.onClick()} value="Submit" />
    </div>
  );
};

export default loginform;
