'use server';
import { ACCESS_TOKEN, CENTER, CUSTOMER, PAGE_HOME, POSITION } from '@/lib/constant';
import { PositionStorage } from '@/lib/providers';
import { Payload } from '@/lib/types';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function isUserAuthenticated() {
  const payload = await getPayload();
  return payload.role === CUSTOMER;
}

export async function getPayload() {
  const cookieStore = await cookies();

  const token = cookieStore.get(ACCESS_TOKEN)?.value;
  if (!token) redirect(PAGE_HOME);

  const decoded: Payload = jwtDecode(token);
  return decoded;
}

export async function getPositionStorage(): Promise<PositionStorage> {
  const cookie = await cookies();
  const value = cookie.get(POSITION)?.value;

  let position: PositionStorage | undefined;

  try {
    position = JSON.parse(value ?? '{}');
  } catch (error) {}

  if (!position || !position.lat || !position.lon) {
    position = {
      lat: CENTER.lat,
      lon: CENTER.long,
      timestamp: new Date().getTime(),
    };
  }

  return position;
}

export async function GET_PAYLOAD() {
  const cookieStore = await cookies();

  const token = cookieStore.get(ACCESS_TOKEN)?.value;
  if (!token) return { error: { message: 'Invalid token' } };

  const decoded: Payload = jwtDecode(token);
  return { data: decoded };
}

export async function GET_TOKEN() {
  const cookieStore = await cookies();

  const token = cookieStore.get(ACCESS_TOKEN)?.value;
  if (!token) return { error: { message: 'Invalid token' } };

  return { data: token };
}
