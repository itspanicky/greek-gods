import React from "react";
import { Query } from "react-apollo";
import NameDetail from "../detail/NameDetail";
import TypeDetail from "../detail/TypeDetail";
import AbodeDetail from "../detail/AbodeDetail";
import DescriptionDetail from "../detail/DescriptionDetail";
import DomainsDetail from "../detail/DomainsDetail";
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
            
          const { god: { id, abode, name, type, description, domains } } = data;
          return (
            <div className="detail">
              <NameDetail id={id} name={name} />
              <TypeDetail id={id} type={type} />
              <DescriptionDetail id={id} description={description} />
              <DomainsDetail id={id} domains={domains} />
              <AbodeDetail id={id} abode={abode} />
            </div>
          );
        }}
      </Query>
    );
};

export default GodDetail;