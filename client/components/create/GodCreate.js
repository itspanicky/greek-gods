import React, { useState } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { NEW_GOD } = Mutations;
const { FETCH_GODS } = Queries;

const GodCreate = () => {

    const [name, setName] = useState("");
    const [type, setType] = useState("god");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState();

    const handleSubmit = (e, newGod) => {
        e.preventDefault();
        newGod({
            variables: {
                name,
                type,
                description
            }
        }).then(data => {
            console.log(data);
            setMessage(`New god "${name}" created successfully`);
            setName("");
            setType("god");
            setDescription("");
        })
    }

    const updateCache = (cache, { data: { newGod } }) => {
        let query;
        try {
            // read current cache for fetching gods query
            query = cache.readQuery({ query: FETCH_GODS });
        } catch (err) {
            return;
        }

        if (query) {
            let godArray = query.gods
            // overwrite query
            cache.writeQuery({
                query: FETCH_GODS,
                data: { gods: godArray.concat(newGod) }
            })
        }
    }

    return (
      <Mutation
        mutation={NEW_GOD}
        update={(cache, data) => updateCache(cache, data)}
      >
        {(newGod, { data }) => (
          <div>
            <form onSubmit={(e) => handleSubmit(e, newGod)}>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
              />
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="god">God</option>
                <option value="goddess">Goddess</option>
              </select>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
              />
              <button type="submit">Create God</button>
            </form>
            <p>{message}</p>
          </div>
        )}
      </Mutation>
    );

}

export default GodCreate;