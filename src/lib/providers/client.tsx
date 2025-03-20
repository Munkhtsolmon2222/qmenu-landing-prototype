'use client';
import React, { createContext, useContext, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { AuthOptions, AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { onError } from '@apollo/client/link/error';
import { PAGE_HOME } from '../constant';
import { Loader } from '@/components/shared';
import { useAction } from '../hooks';
import { GET_TOKEN } from '@/actions';
import { redirectWithNProgress } from '../utils';
import { showToast } from '../helpers';

const region = process.env.APP_REGION ?? 'ap-southeast-1';
const url = process.env.NEXT_PUBLIC_APP_STAGE || '';

const ApolloClientContext = createContext<ApolloClient<unknown> | null>(null);

const initializeClient = (token: string) => {
  const auth: AuthOptions = {
    type: AUTH_TYPE.AWS_LAMBDA,
    token: () => token,
  };

  const authLink = createAuthLink({ url, region, auth });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        console.log(`[GraphQL error]: Message:`, err.message);
        if ('errorType' in err) {
          switch (err.errorType) {
            case 'UnauthorizedException':
              location.reload();
              break;
            case 'CE0003':
              const path = location.pathname.split('/').join('');
              if (path && path.length > 0) window.location.href = PAGE_HOME;
              break;
            default:
              showToast(err.message);
              break;
          }
        } else showToast(err.message);
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const httpLinkWithMiddleware = authLink.concat(errorLink);
  const httpLink = createHttpLink({ uri: url });

  const newClient = new ApolloClient({
    link: ApolloLink.from([
      httpLinkWithMiddleware,
      createSubscriptionHandshakeLink({ url: url, region, auth }, httpLink),
    ]),
    cache: new InMemoryCache(),
  });

  console.log('client: init');
  return newClient;
};

export const useApolloClient = () => useContext(ApolloClientContext);

export const CustomApolloProvider: React.FC<{
  children: React.ReactNode;
  loader?: React.JSX.Element;
}> = ({ children, loader }) => {
  const [client, setClient] = useState<ApolloClient<unknown>>();

  const { loading } = useAction(GET_TOKEN, {
    onSuccess(token) {
      if (!token) {
        redirectWithNProgress(PAGE_HOME);
        return;
      }

      const newClient = initializeClient(token);
      setClient(newClient);
    },
  });

  if (!client || loading) return loader ?? <Loader className="h-full" />;

  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  );
};
