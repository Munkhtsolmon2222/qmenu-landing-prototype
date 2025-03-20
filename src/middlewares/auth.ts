import { NextResponse } from 'next/server';
import { Middleware } from './types';
import { isValidToken } from '@/lib/helpers';
import { ACCESS_TOKEN, PAGE_ERROR } from '@/lib/constant';
import { GET_ACCESS_TOKEN } from '@/actions';

export const middleware: Middleware = async (req, response) => {
  const currentPath = req.nextUrl.pathname;
  if (currentPath === PAGE_ERROR) return { send: NextResponse.next() };

  let token = req.cookies.get(ACCESS_TOKEN)?.value;

  const valid = isValidToken(token);
  if (valid) return;

  const { data } = await GET_ACCESS_TOKEN();
  token = data?.token;

  if (!token) return { send: NextResponse.redirect(new URL(PAGE_ERROR, req.url)) };

  response.cookies.set(ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30days
  });

  return { response };
};
