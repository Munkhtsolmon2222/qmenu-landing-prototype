import { ACCESS_TOKEN, ID, PAGE_NOT_FOUND, PAGE_RESTAURANT } from '@/lib/constant';
import { Middleware } from './types';
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { Payload } from '@/lib/types';
import { GET_CHANNEL_TOKEN } from '@/actions';

const updateToken = async (id: string, req: NextRequest, response: NextResponse) => {
  const { data } = await GET_CHANNEL_TOKEN(id);
  const newToken = data?.token;

  if (!newToken) return { send: NextResponse.redirect(new URL(PAGE_NOT_FOUND, req.url)) };

  response.cookies.set(ACCESS_TOKEN, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30days
  });

  return { response };
};

export const middleware: Middleware = async (req, response) => {
  const { pathname, searchParams } = new URL(req.url);

  if (!pathname.startsWith(PAGE_RESTAURANT)) return;

  const id = pathname.split('/')[2];

  if (!id) {
    const id = searchParams.get(ID);
    if (!id) return { send: NextResponse.redirect(new URL(PAGE_NOT_FOUND, req.url)) };

    const newUrl = new URL(`${PAGE_RESTAURANT}/${id}`, req.url);
    newUrl.search = searchParams.toString();

    return { send: NextResponse.redirect(newUrl) };
  }

  const currentCookieToken = req.cookies.get(ACCESS_TOKEN)?.value;
  if (!currentCookieToken) return updateToken(id, req, response);

  const currentToken: Payload = jwtDecode(currentCookieToken);
  if (currentToken.channel === id) return;

  return updateToken(id, req, response);
};
