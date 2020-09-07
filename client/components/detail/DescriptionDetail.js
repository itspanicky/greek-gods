import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
const { UPDATE_GOD_DESCRIPTION } = Mutations;

const DescriptionDetail = props => {
    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState(props.description || "");

    const handleSubmit = (e, updateGodDescription) => {
      e.preventDefault();
      updateGodDescription({
        variables: {
          id: props.id,
          description,
        },
      }).then(() => setEditing(false));
    };

     if (editing) {
       return (
         <Mutation mutation={UPDATE_GOD_DESCRIPTION}>
           {(updateGodDescription, data) => (
             <div>
               <form onSubmit={(e) => handleSubmit(e, updateGodDescription)}>
                 <textarea
                   onChange={(e) => setDescription(e.target.value)}
                   value={description}
                 />
                 <button type="submit">Update Description</button>
               </form>
             </div>
           )}
         </Mutation>
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
           <p style={{ display: "inline" }}>{description}</p>
         </div>
       );
     }

};

export default DescriptionDetail;
