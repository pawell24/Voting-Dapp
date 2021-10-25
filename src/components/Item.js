import React from "react";
import { Button } from "./Components.styled";
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
      <p>{voteCount}</p>
      <Button style={{ marginLeft: "10px" }} onClick={() => handleVoting(id)}>
        Vote
      </Button>
    </li>
  );
};

export default Item;
