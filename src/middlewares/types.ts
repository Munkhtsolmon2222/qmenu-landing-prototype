import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type Middleware = (
  req: NextRequest,
  res: NextResponse<unknown>,
  event: NextFetchEvent,
) => Promise<
  | {
      send?: NextResponse;
      response?: NextResponse;
    }
  | undefined
  | void
>;
