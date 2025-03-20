import { middleware as corsMiddleware } from './middlewares/cors';
import { middleware as authMiddleware } from './middlewares/auth';
import { middleware as userAuthMiddleware } from './middlewares/user.auth';
import { middleware as headersMiddleware } from './middlewares/headers';
import { middleware as qrMiddleware } from './middlewares/qr';
import { middleware as restaurantMiddleware } from './middlewares/restaurant';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { Middleware } from './middlewares/types';

const middlewares: Middleware[] = [
  corsMiddleware,
  qrMiddleware,
  headersMiddleware,
  authMiddleware,
  userAuthMiddleware,
  restaurantMiddleware,
];

export default async function (req: NextRequest, event: NextFetchEvent) {
  let mainResponse = NextResponse.next();

  for await (const middleware of middlewares) {
    const res = await middleware(req, mainResponse, event);
    if (!res) continue;

    const { send, response } = res;

    if (send) {
      mainResponse = send;
      break;
    }

    if (response) mainResponse = response;
  }

  return mainResponse;
}

export const config = {
  matcher: ['/:path*'],
};
