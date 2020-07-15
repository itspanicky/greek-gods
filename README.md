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