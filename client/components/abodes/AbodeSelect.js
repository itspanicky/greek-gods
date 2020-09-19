import React from "react";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_ABODES } = Queries;

const AbodeSelect = ({ abode, onChange }) => {
  const handleChange = (e) => {
    e.preventDefault();

  }

  return (
      <select name="abodes" id="abodes" value={abode} onChange={onChange}>
          <option value="" disabled selected>
            Select abode
          </option>
        <Query query={FETCH_ABODES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            return data.abodes.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ));
          }}
        </Query>
      </select>
  );
};

export default AbodeSelect;
