import { GraphQLRequestContext } from "apollo-server-plugin-base"
export const loggerPlugin = {

    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext: GraphQLRequestContext) {
        console.log("query: " + requestContext.request.query);
        console.log("variables: " + JSON.stringify(requestContext.request.variables));
    },
};