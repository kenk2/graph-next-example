// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "@kenk2/graphql";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer);
