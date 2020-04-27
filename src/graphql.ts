import { ApolloServer, Config } from "apollo-server-lambda";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolver";
import { loggerPlugin } from "./graphql/loggerPlugin";
import { config } from "dotenv";
config();


const apolloServerConfig: Config = { typeDefs, resolvers };
if (process.env.NODE_ENV !== "production") {
    apolloServerConfig.plugins = [loggerPlugin];
    apolloServerConfig.playground = { endpoint: "/dev/graphql" };
}

const server = new ApolloServer(apolloServerConfig);

export const graphqlHandler = server.createHandler({
    cors: {
        origin: '*',
    },
});
