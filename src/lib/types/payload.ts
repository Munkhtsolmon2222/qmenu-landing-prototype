import { SystemType } from '../constant';

export interface Payload {
  iss: string;
  branch: string;
  sub: string;
  type: SystemType;
  role: 'guest' | 'customer' | 'system' | string;
  features?: string[];
  name?: string;
  email?: string;
  picture?: string;
  roles?: string[];
  channel?: string;
  table?: string;
  currency?: string;
  languages?: string[];
  exp: number;
}
