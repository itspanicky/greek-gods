import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { FETCH_ABODES } = Queries;


const AbodeDetail = props => {
  const [editing, setEditing] = useState(false);
  const [abode, setAbode] = useState(props.abode || "");
  console.log("abode", abode);

  if (editing) {
    return (
      <Mutation>

      </Mutation>

    )
  } else {
    return (
      <div>
        <div
          onClick={() => setEditing(true)}
          style={{ fontSize: "10px", cursor: "pointer", display: "inline" }}
        >
          <IconContext.Provider value={{ className: "custom-icon" }}>
            <FaPencilAlt />
          </IconContext.Provider>
        </div>
        <p style={{ display: "inline" }}>Abode: {abode.name}</p>
      </div>
    );
  }
}

export default AbodeDetail;