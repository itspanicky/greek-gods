import React, { useState } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { NEW_ABODE } = Mutations;
const { FETCH_ABODES } = Queries;

const AbodeCreate = () => {
    const [name, setName] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e, newAbode) => {
        e.preventDefault();
        newAbode({
            variables: {
                name,
                coordinates
            }
        }).then(data => {
            console.log(data);
            setMessage(`New Abode "${name}" created successfully`);
            setName("");
            setCoordinates("");
        })
    };

    const updateCache = (cache, { data: { newAbode } }) => {
      let query;
      try {
        // read current cache for fetching abodes query
        query = cache.readQuery({ query: FETCH_ABODES });
      } catch (err) {
        return;
      }
      
      if (query) {
        let abodeArray = query.abodes;
        // overwrite query
        cache.writeQuery({
          query: FETCH_ABODES,
          data: { abodes: abodeArray.concat(newAbode) },
        });
      }
    };

    return (
      <Mutation
        mutation={NEW_ABODE}
        update={(cache, data) => updateCache(cache, data)}
      >
        {(newAbode, { data }) => (
          <div>
            <form onSubmit={(e) => handleSubmit(e, newAbode)}>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
              />
              <input
                onChange={(e) => setCoordinates(e.target.value)}
                value={coordinates}
                placeholder="Coordinates"
              />
              <button type="submit">Create Abode</button>
            </form>
            <p>{message}</p>
          </div>
        )}
      </Mutation>
    );
};

export default AbodeCreate;