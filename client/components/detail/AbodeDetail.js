import React, { useState } from "react";
import AbodeSelect from "../abodes/AbodeSelect";
import { Mutation, Query } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { UPDATE_GOD_ABODE } = Mutations;
const { FETCH_ABODES } = Queries;


const AbodeDetail = props => {
  const [editing, setEditing] = useState(false);
  const [abode, setAbode] = useState(props.abode || null);
  const [abodes, setAbodes] = useState([]);

  console.log("abode", abode);

  const handleChange = (e) => {
    e.preventDefault();
    const id = e.target.value;
    const name = abodes.find(ele => ele.id = id).name;
    setAbode({ id, name });
  }

  const handleSubmit = (e, updateGodAbode) => {
    e.preventDefault();
    updateGodAbode({
      variables: {
        godId: props.id,
        abodeId: abode.id,
      },
    }).then(() => {
      setEditing(false);
    });
  };

  if (editing) {
    return (
      <div>
        {/* <AbodeSelect abode={abode} onChange={(e) => setAbode(e.target.value)} /> */}
        <Mutation mutation={UPDATE_GOD_ABODE}>
          {(updateGodAbode, data) => (
            <div>
              <form onSubmit={(e) => handleSubmit(e, updateGodAbode)}>
                <select
                  value={abode}
                  onChange={handleChange}
                >
                  <Query query={FETCH_ABODES}>
                    {({ loading, error, data }) => {
                      if (loading) return <option>Loading...</option>;
                      if (error) return <option>Error</option>;
                      setAbodes(data.abodes);
                      return data.abodes.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ));
                    }}
                  </Query>
                </select>
                <button type="submit">Update Abode</button>
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
        <p style={{ display: "inline" }}>Abode: {abode.name}</p>
      </div>
    );
  }
}

export default AbodeDetail;