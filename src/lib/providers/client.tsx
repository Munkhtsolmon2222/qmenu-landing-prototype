"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { getToken } from "./auth";
import { AuthOptions, AUTH_TYPE, createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { onError } from "@apollo/client/link/error";
import { toast } from "@/components/ui/use-toast";
import { PAGE_HOME } from "../config/page";

const region = process.env.APP_REGION ?? "ap-southeast-1";
const url = process.env.NEXT_PUBLIC_APP_STAGE || "";

const ApolloClientContext = createContext<ApolloClient<unknown> | null>(null);

const initializeClient = () => {
  const auth: AuthOptions = {
    type: AUTH_TYPE.AWS_LAMBDA,
    token: () => getToken(),
  };

  const authLink = createAuthLink({ url, region, auth });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        console.log(`[GraphQL error]: Message:`, err.message);
        if ("errorType" in err) {
          switch (err.errorType) {
            case "UnauthorizedException":
              localStorage?.removeItem("token");
              // location.reload();
              break;
            case "CE0003":
              localStorage?.removeItem("token");
              const path = location.pathname.split("/").join("");
              if (path && path.length > 0) window.location.href = PAGE_HOME;
              break;
            default:
              toast({
                title: "Failed",
                variant: "default",
                description: err.message,
              });
              break;
          }
        } else {
          toast({
            title: "GraphQL Error",
            variant: "default",
            description: err.message,
          });
        }
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const httpLinkWithMiddleware = authLink.concat(errorLink);
  const httpLink = createHttpLink({ uri: url });

  console.log("END URL", url);

  const newClient = new ApolloClient({
    link: ApolloLink.from([
      httpLinkWithMiddleware,
      createSubscriptionHandshakeLink({ url: url, region, auth }, httpLink),
    ]),
    cache: new InMemoryCache(),
  });

  console.log("client:token");
  return newClient;
};

export const useApolloClient = () => useContext(ApolloClientContext);

export const CustomApolloProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<ApolloClient<unknown>>(
    initializeClient()
  );

  useEffect(() => {
    const tokenChangeListener = () => setClient(initializeClient());

    tokenChangeListener();

    window.addEventListener("tokenChanged", tokenChangeListener);

    return () => {
      window.removeEventListener("tokenChanged", tokenChangeListener);
    };
  }, []);

  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  );
};
