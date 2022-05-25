const graphiql = require('graphql');
const axios = require('axios')
const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphiql;
const baseUrl = 'http://localhost:5001';

const BookType = new GraphQLObjectType({
    name: "BookType",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}, 
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            async resolve({authorId}, args) {
                const all = await axios.get(`${baseUrl}/authors`).then(({data}) => data);
                return all.find(author => author.id.toString() === authorId.toString())
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}, 
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            async resolve({id}, args) {
                const all = await axios.get(`${baseUrl}/books`).then(({data}) => data);
                return all.filter(book => book.authorId.toString() === id.toString());
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, {id}, req) {
                return axios.get(`${baseUrl}/books/${id}`).then(({data}) => data)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, {id}) {
                return axios.get(`${baseUrl}/authors/${id}`).then(({data}) => data)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args) {
                return axios.get(`${baseUrl}/books`).then(({data}) => data)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve() {
                return axios.get(`${baseUrl}/authors`).then(({data}) => data)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, {name, age}) {
                return axios.post(`${baseUrl}/authors`, {name, age}).then(({data}) => data)
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parentValue, {name, genre, authorId}) {
                const author = await axios.get(`${baseUrl}/authors/${authorId}`).then(({data}) => data);
                if (!author) throw new Error('Author not found')
                return axios.post(`${baseUrl}/books`, {name, genre, authorId}).then(({data}) => data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})