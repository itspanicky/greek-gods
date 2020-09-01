import React, { useState } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const { NEW_GOD } = Mutations;
const { FETCH_GODS } = Queries;

const GodCreate = () => {
    const [form, setForm] = useState({
        name: "",
        type: "god",
        description: ""
    });

    const [message, setMessage] = useState();

    const update = (e, field) => {
        setForm({
            ...form,
            [field]: e.target.value
        })
    };

    const handleSubmit = (e, newGod) => {
        e.preventDefault();
        const { name, type, description } = form;
        newGod({
            variables: {
                name,
                type,
                description
            }
        }).then(data => {
            console.log(data);
            setMessage(`New god "${name}" created successfully`);
            setForm({
                name: "",
                type: "god",
                description: ""
            });
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
                onChange={update("name")}
                value={form.name}
                placeholder="Name"
              />
              <select value={form.type} onChange={update("type")}>
                <option value="god">God</option>
                <option value="goddess">Goddess</option>
              </select>
              <textarea
                value={form.description}
                onChange={update("description")}
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