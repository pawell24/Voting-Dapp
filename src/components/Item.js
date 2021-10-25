import React from "react";
import { Button } from "react-bootstrap";
const Item = ({ id, name, voteCount, handleVoting }) => {
  return (
    <li
      style={{
        listStyle: "none",
        border: "2px solid #aaa",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
        marginTop: "10px",
      }}
    >
      <h2>{id}</h2>
      <h2>{name}</h2>
      <h2 style={{ marginRight: "-3px" }}>{voteCount}</h2>
      <Button variant="info" onClick={() => handleVoting(id)}>
        Vote
      </Button>
    </li>
  );
};

export default Item;
