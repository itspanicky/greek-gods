import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import Mutations from "../../graphql/mutations";

const { ADD_GOD_DOMAIN, REMOVE_GOD_DOMAIN } = Mutations;

const DomainsDetail = props => {
    const [editing, setEditing] = useState(false);
    const [newDomain, setNewDomain] = useState("");
    const [domains, setDomains] = useState(props.domains || []);

    const handleSubmit = (e, addGodDomain) => {
      e.preventDefault();
      addGodDomain({
        variables: {
          id: props.id,
          domain: newDomain
        },
      }).then(() => {
        setDomains([...domains, newDomain]);
        setEditing(false);
      });
    };

    const handleRemove = (i, removeGodDomain) => {
      removeGodDomain({
        variables: {
          id: props.id,
          domain: domains[i]
        }
      }).then(() => {
          let domainsArray = domains;
          domainsArray.splice(i, 1);
          setDomains(domainsArray);
          setEditing(false);
      })
    }

    if (editing) {
      return (
        <div>
          <p>Domains:</p>
          <ul>
            {domains.map((domain, i) => (
              <li key={i}>
                <Mutation mutation={REMOVE_GOD_DOMAIN}>
                  {(removeGodDomain, data) => (
                    <div>
                      {domain}
                        <div
                        onClick={() => handleRemove(i, removeGodDomain)}
                        style={{
                            fontSize: "14px",
                            padding: "0 5px",
                            cursor: "pointer",
                            display: "inline",
                        }}
                        >
                        <IconContext.Provider
                            value={{ className: "custom-icon" }}
                        >
                            <FaRegTimesCircle />
                        </IconContext.Provider>
                      </div>
                    </div>
                  )}
                </Mutation>
              </li>
            ))}
          </ul>
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
          <ul>
            {domains.map((domain, i) => (
              <li key={i}>{domain}</li>
            ))}
          </ul>
        </div>
      );
    }
};

export default DomainsDetail;