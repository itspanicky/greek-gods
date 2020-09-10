import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";

const { ADD_GOD_DOMAIN, REMOVE_GOD_DOMAIN } = Mutations;

const DomainsDetail = props => {
    const [editing, setEditing] = useState(false);
    const [newDomain, setNewDomain] = useState("");
    const [domains, setDomains] = useState(props.domains || []);

    const handleSubmit = (e, action) => {
      e.preventDefault();
      action({
        variables: {
          id: props.id,
          domain: newDomain
        },
      }).then(() => {
        setDomains([...domains, newDomain]);
        setEditing(false);
      });
    };

    if (editing) {
      return (
        <div>
          <p>Domains:</p>
          <Mutation mutation={ADD_GOD_DOMAIN}>
            {(addGodDomain, data) => (
              <div>
                <form onSubmit={(e) => handleSubmit(e, addGodDomain)}>
                  <input
                    onChange={(e) => setNewDomain(e.target.value)}
                    value={newDomain}
                  />
                  <button type="submit">Add Domain</button>
                </form>
              </div>
            )}
          </Mutation>
        </div>
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
            <p style={{ display: "inline" }}>Domains:</p>
            {domains.map((domain, i) => (
              <ul key={i}>
                <p>{domain}</p>
              </ul>
            ))}
        </div>
      );
    }
};

export default DomainsDetail;