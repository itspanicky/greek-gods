import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";

const AbodeDetail = props => {
  const [abode, setAbode] = useState(props.abode || "");
  console.log("abode", abode);
  return (
    <div>
      <p>Abode: {abode.name}</p>
    </div>
  )
}

export default AbodeDetail;