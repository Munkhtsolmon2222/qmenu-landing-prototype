"use client";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { toast } from "@/components/ui/use-toast";

// const region = process.env.APP_REGION ?? "ap-southeast-1";

const url = `https://tzgknbo22fepzihsth3vnbclou.appsync-api.ap-east-1.amazonaws.com/graphql`;

const httpLink = createHttpLink({
  uri: url,
});

const authLink = (token: string) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      console.log(`[GraphQL error]: Message:`, err.message);
      toast({
        title: "Failed",
        variant: "default",
        description: err.message,
      });
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const createClient = (token: string) => {
  const link = ApolloLink.from([authLink(token), errorLink, httpLink]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createClient;
