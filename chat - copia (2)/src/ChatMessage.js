import React from "react";
import "./chat.css";

export default ({ name, message, date }) => (
  <div className="mess">
    <p className="msm">
      <strong>{name + "  :"}</strong> <em>{message}</em>
      <p className="fecha"> {date}</p>
    </p>
  </div>
);
