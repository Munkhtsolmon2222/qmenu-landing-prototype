import { Middleware } from './types';
import { HEADER_ORIGIN, HEADER_PATHNAME, HEADER_SEARCH, HEADER_URL } from '@/lib/constant';

export const middleware: Middleware = async (request, response) => {
  const { pathname, searchParams, origin } = new URL(request.url);

  response.headers.set(HEADER_URL, request.url);
  response.headers.set(HEADER_ORIGIN, origin);
  response.headers.set(HEADER_PATHNAME, pathname);
  response.headers.set(HEADER_SEARCH, searchParams.toString());

  return { response };
};
