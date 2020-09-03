import React, { useState } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { NEW_EMBLEM } = Mutations;
const { FETCH_EMBLEMS } = Queries;

const EmblemCreate = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const updateCache = (cache, { data: { newEmblem } }) => {
        let query;
       try {
         // read current cache for fetching gods query
         query = cache.readQuery({ query: FETCH_EMBLEMS });
       } catch (err) {
         return;
       }

       if (query) {
         let emblemArray = query.emblems;
         // overwrite query
         cache.writeQuery({
           query: FETCH_EMBLEMS,
           data: { emblems: emblemArray.concat(newEmblem) },
         });
       }
    };

    return (
      <Mutation
        mutation={NEW_EMBLEM}
        update={(cache, data) => updateCache(cache, data)}
      >
        {(newEmblem, { data }) => (
          <div>
            <form onSubmit={(e) => handleSubmit(e, newEmblem)}>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
              />
              <button type="submit">Create Emblem</button>
            </form>
            <p>{message}</p>
          </div>
        )}
      </Mutation>
    );

};

export default EmblemCreate;