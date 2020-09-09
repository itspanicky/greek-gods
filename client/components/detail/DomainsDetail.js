import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
const { ADD_GOD_DOMAIN, REMOVE_GOD_DOMAIN } = Mutations;

const DomainsDetail = props => {
    const [editing, setEditing] = useState(false);
    const [domains, setDomains] = useState(props.domains || []);

    const handleSubmit = (e, action) => {
      e.preventDefault();
      action({
        variables: {
          id: props.id,
          domains,
        },
      }).then(() => setEditing(false));
    };

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
        <p style={{ display: "inline" }}>Domains:</p>
        {domains.map((domain, i) => (
          <ul key={i}>
            <p>{domain}</p>
          </ul>
        ))}
      </div>
    );
};

export default DomainsDetail;