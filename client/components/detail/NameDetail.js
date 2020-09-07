import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_NAME } = Mutations;

const NameDetail = props => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(props.name || "");

    const handleSubmit = (e, updateGodName) => {
        e.preventDefault();
        updateGodName({ 
            variables: {
                id: props.id,
                name
            }
        }).then(() => setEditing(false))
    };

    if (editing) {
      return (
        <Mutation mutation={UPDATE_GOD_NAME}>
          {(updateGodName, data) => (
            <div>
              <form onSubmit={(e) => handleSubmit(e, updateGodName)}>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <button type="submit">Update Name</button>
              </form>
            </div>
          )}
        </Mutation>
      );
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
            <h2>{name}</h2>
          </div>
        );
    }
};

export default NameDetail;