import React from "react";
import { Query } from "react-apollo";
import NameDetail from "../detail/NameDetail";
import Queries from "../../graphql/queries";
const { FETCH_GOD } = Queries;

const GodDetail = props => {

    return (
      <Query
        query={FETCH_GOD}
        variables={{
          id: props.match.params.id, // grab id from url
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
            
          const { god: {id, name} } = data;
          return (
            <div className="detail">
              <NameDetail id={id} name={name} />
            </div>
          );
        }}
      </Query>
    );
};

export default GodDetail;