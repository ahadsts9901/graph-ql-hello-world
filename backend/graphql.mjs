import { ApolloServer } from "@apollo/server"
import axios from "axios"

export const server = new ApolloServer({

    typeDefs: `
    
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
        }
        
        type User {
            id: ID!
            username: String!
            email: String!
            phone: String!
            website: String!
        }

        type Query {
            getTodos: [Todo]
            getUser(id:ID!) : User
            getUsers: [User]
        }
        
        `
    ,
    resolvers: {

        Todo: {

            user: async (todo) => {
                return (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo?.userId}`)).data
            }

        },

        Query: {

            getTodos: async () => {
                return (await axios.get("https://jsonplaceholder.typicode.com/todos")).data
            },

            getUsers: async () => {
                return (await axios.get("https://jsonplaceholder.typicode.com/users")).data
            },

            getUser: async (parent, { id }) => {
                return (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
            },

        }

    },

})