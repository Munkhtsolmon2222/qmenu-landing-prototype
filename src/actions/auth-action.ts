'use server';
import { query } from '@/api';
import { TOKEN_QUERY } from '@/graphql/query';
import { ACCESS_TOKEN, ChannelType, SystemType } from '@/lib/constant';
import { isValidToken } from '@/lib/helpers';
import { cookies } from 'next/headers';

export const authenticate = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30days
  });

  return Promise.resolve();
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);
  // redirect(PAGE_HOME);
};

export const GET_ACCESS_TOKEN = async () => {
  return query<{ token: string }>({
    query: TOKEN_QUERY.CURRENT_TOKEN,
    variables: { type: ChannelType.QM },
    token: process.env.APP_API_KEY,
  });
};

export const GET_CHANNEL_TOKEN = async (id: string, type: SystemType = SystemType.C) => {
  let token = (await cookies()).get(ACCESS_TOKEN)?.value;

  if (!isValidToken(token)) token = process.env.APP_API_KEY;
  return query<{ token: string }>({
    query: TOKEN_QUERY.GET_CHANNEL_TOKEN,
    variables: { id, type },
    token,
  });
};
