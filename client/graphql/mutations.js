import gql from "graphql-tag";

export default {
  // we make sure to use the `mutation` key word when creating our frontend mutations
  // just like we would in GraphiQL
  UPDATE_GOD_NAME: gql`
    mutation updateGod($id: ID!, $name: String!) {
      updateGod(id: $id, name: $name) {
        id
        name
      }
    }
  `,
  UPDATE_GOD_TYPE: gql`
    mutation updateGod($id: ID!, $type: String!) {
      updateGod(id: $id, type: $type) {
        id
        type
      }
    }
  `,
  ADD_GOD_DOMAIN: gql`
    mutation addGodDomain($id: ID!, $domain: String!) {
      addGodDomain(id: $id, domain: $domain) {
        id
        domains
      }
    }
  `,
  REMOVE_GOD_DOMAIN: gql`
    mutation removeGodDomain($id: ID!, $domain: String!) {
      removeGodDomain(id: $id, domain: $domain) {
        id
        domains
      }
    }
  `,
  UPDATE_GOD_DESCRIPTION: gql`
    mutation updateGod($id: ID!, $description: String!) {
      updateGod(id: $id, description: $description) {
        id
        description
      }
    }
  `,
  DELETE_GOD: gql`
    mutation DeleteGod($id: ID!) {
      deleteGod(id: $id) {
        id
      }
    }
  `,
  NEW_GOD: gql`
    mutation NewGod($name: String!, $type: String!, $description: String!) {
      newGod(name: $name, type: $type, description: $description) {
        id
        name
        description
      }
    }
  `,
  NEW_EMBLEM: gql`
    mutation NewEmblem($name: String!) {
      newEmblem(name: $name) {
        id
        name
      }
    }
  `,
  NEW_ABODE: gql`
    mutation NewAbode($name: String!, $coordinates: String!) {
      newAbode(name: $name, coordinates: $coordinates) {
        id
        name
        coordinates
      }
    }
  `,
};
