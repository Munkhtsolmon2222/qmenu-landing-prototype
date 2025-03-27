'use server';
import { isValidToken } from '@/lib/helpers';
import { DocumentNode } from 'graphql';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/lib/constant';
import { api } from './api';
import { QueryError } from '@/lib/types';
import { print } from 'graphql';

function getQueryString(docNode: DocumentNode): string | undefined {
  try {
    return print(docNode);
  } catch {
    return undefined;
  }
}

export async function query<T>(options: {
  query: DocumentNode;
  variables?: any;
  token?: string | undefined;
}): Promise<{ data?: T; error?: QueryError }> {
  const { query, variables, token: customToken } = options;

  const queryString = getQueryString(query);
  if (!queryString) return { error: { message: 'Invalid GraphQL query' } };

  const operationName = getOperationName(query);

  const token = customToken ?? (await getToken());

  try {
    const response = await api.post(
      '',
      { query: queryString, variables },
      { headers: { Authorization: token, 'Content-Type': 'application/json' } },
    );

    const data = response.data.data;

    const error = response.data.errors?.find((e: any) => e.message);

    if (!data || error) {
      const message = error?.message ?? 'Failed';
      const code = error?.errorType;

      console.log(`Request error: ${operationName}`, message, code);
      return { error: { message, code } };
    }

    return { data: data[operationName as string] };
  } catch (err: any) {
    console.log(`Request error: ${operationName}`, err);
    return { error: { message: err.message } };
  }
}

async function getToken() {
  const token = (await cookies()).get(ACCESS_TOKEN)?.value;
  if (!isValidToken(token)) return;
  return token;
}

function getOperationName(docNode: any): string | undefined {
  const operationDefinition = docNode.definitions.find(
    (def: any) => def.kind === 'OperationDefinition',
  );
  return operationDefinition?.name?.value;
}
