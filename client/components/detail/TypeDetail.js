import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_TYPE } = Mutations;

const TypeDetail = (props) => {
    const [editing, setEditing] = useState(false);
    const [type, setType] = useState(props.type || "");

    const handleSubmit = (e, updateGodType) => {
        e.preventDefault();
        updateGodType({
            variables: {
                id: props.id,
                type
            }
        }).then(() => setEditing(false))
    };

    if (editing) {
      return (
        <Mutation mutation={UPDATE_GOD_TYPE}>
          {(updateGodType, data) => (
            <div>
              <form onSubmit={(e) => handleSubmit(e, updateGodType)}>
                <select
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option value="god">God</option>
                  <option value="goddess">Goddess</option>
                </select>
                <button type="submit">Update Type</button>
              </form>
            </div>
          )}
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
          <p style={{ display: "inline" }}>{type}</p>
        </div>
      );
    }
};

export default TypeDetail;