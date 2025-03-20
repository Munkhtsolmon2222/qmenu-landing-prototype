'use server';
import { ACCESS_TOKEN, CUSTOMER, PAGE_HOME } from '@/lib/constant';
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
