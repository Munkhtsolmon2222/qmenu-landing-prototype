import { NextResponse } from 'next/server';
import { Middleware } from './types';
import { QR_MENU_URL } from '@/lib/constant';

export const middleware: Middleware = async (req) => {
  const { pathname, searchParams } = new URL(req.url);

  const isQr = pathname.startsWith('/qr');
  if (!isQr) return;

  const code = pathname.split('/').pop();

  let url = QR_MENU_URL + `/${code}`;

  if (searchParams.size > 0) url += '?' + searchParams.toString();

  return { send: NextResponse.redirect(url) };
};
