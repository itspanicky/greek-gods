import React, { useState } from "react";
import GodCreate from "./GodCreate";
import AbodeCreate from "./AbodeCreate";
import EmblemCreate from "./EmblemCreate";

const Create = () => {
    const [type, setType] = useState("god");
    const [form, setForm] = useState(<GodCreate />);

    const updateSelection = (e) => {
        e.preventDefault();
        setType(e.target.value);

        switch (e.target.value) {
            case "god":
                setForm(<GodCreate />);
                break;
            case "abode":
                setForm(<AbodeCreate />);
                break;
            case "emblem":
                setForm(<EmblemCreate />);
                break;
        };
    };

    return (
      <div>
        <select onChange={updateSelection}>
          <option value="god">God</option>
          <option value="abode">Abode</option>
          <option value="emblem">Emblem</option>
        </select>
        <h4>Create a new {type}</h4>
        {form}
      </div>
    );
}

export default Create;