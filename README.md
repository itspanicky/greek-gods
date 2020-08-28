# greek-gods

# Importing seed_data to database
1. brew tap mongodb/brew
2. brew install mongodb-community
3. brew services start mongodb-community
4. cd into seed_data
5. mongorestore --host GraphQL-shard-0/graphql-shard-00-00-1jras.mongodb.net:27017,graphql-shard-00-01-1jras.mongodb.net:27017,graphql-shard-00-02-1jras.mongodb.net:27017 --ssl --username dev --password <PASSWORD> --authenticationDatabase admin --db <db_name> <file_name>


# Common Errors
- RootQueryType.resolve field config must be an object.
    - resolve function is misplaced


# Queries
1. Zeus
    {
    god(id: "5c98ea9bd5a3ca0de10a151a" ) {
            id,
            name,
            type,
            description,
            domains,
            abode {name, coordinates},
            emblems {name}
                parents {name},
            children {name},
            siblings {name}
            
        }
    }

# Mutations
1. Create New God
    mutation {
      newGod(name: "Test", type: "Test", description: "Test") {
        id,
        name,
        type,
        description
      }
    }

2. Delete God
    mutation {
      deleteGod(id: "5f16414cc2ee1012dcba6d82") {
        id
      }
    }

3. Update God
    mutation {
      updateGod(id:"5f16414cc2ee1012dcba6d82", name:"Updated Test God") {
        id,
        name,
        type,
        description
      }
    }


# Apollo
1. Apollo Client - state management library for both local and remote data with GraphQL