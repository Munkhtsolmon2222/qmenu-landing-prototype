import { NextResponse } from 'next/server';
import { Middleware } from './types';
import {
  ACCESS_TOKEN,
  GUESTS_PAGES,
  PAGE_LOGIN,
  PAGE_PROFILE,
  PRIVATE_PAGES,
} from '@/lib/constant';
import { validUserToken } from '@/lib/helpers';

export const middleware: Middleware = async (req) => {
  const token = req.cookies.get(ACCESS_TOKEN)?.value;
  const currentPath = req.nextUrl.pathname;

  if (!PRIVATE_PAGES.includes(currentPath)) {
    if (GUESTS_PAGES.includes(currentPath) && validUserToken(token)) {
      return { send: NextResponse.redirect(new URL(PAGE_PROFILE, req.url)) };
    }
    return;
  }

  if (!validUserToken(token)) return { send: NextResponse.redirect(new URL(PAGE_LOGIN, req.url)) };
};
