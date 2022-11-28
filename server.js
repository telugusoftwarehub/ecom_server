const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const app = express();

const authors = [
  {id: 1, name: 'Rowling'},
  {id: 2, name: 'Tolkien'},
  {id: 3, name: 'Weeks'}
]

const books = [
  { id: 1, name: 'Harry Potter and A', authorId: 1},
  { id: 2, name: 'Harry Potter and B', authorId: 1},
  { id: 3, name: 'Harry Potter and C', authorId: 1}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt)},
    name: {type: GraphQLNonNull(GraphQLString)},
    authorId: { type: GraphQLNonNull(GraphQLInt)}
  })
})

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
      books: {
        type: new GraphQLList(BookType),
        description: 'List all Books!',
        resolve: () => books
      }
    })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))

app.listen(5000, () => { console.log('Server Started!')});