import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';

export type Parent = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};
export type Child = {
  id: string;
  parentId: string;
  username: string;
  email: string;
  passwordHash: string;
  expireDate: string;
  device: string;
  active: boolean;
  lastSeen: string;
};

// Demo records only. Passwords are scrypt hashes; plaintext passwords are never stored.
export const parents: Parent[] = [
  {
    id: 'parent-001',
    name: 'Safetly Parent',
    email: 'parent@safetly.test',
    passwordHash:
      '1f99e39ce0fd088436a4e7385d15a2f2:78dbfac7a2915517723605af5e5194708615a2ac4cd196bcd44d265912d88ff9acd9c1e66ccb8d702e943e87f94bf4c636690192e40c281b4704181a905409b7',
  },
];

export const children: Child[] = [
  {
    id: 'child-001',
    parentId: 'parent-001',
    username: 'ayan-01',
    email: 'ayan@safetly.test',
    passwordHash:
      '9ee10c28c5fb6d174bf48c70b763a513:c5d0de2c0500e5c293229c2ad9010266ba5c06dcea2e2b7a04810f9d3e5bffb7659a92e322f9357261e8edf0c560de62989a8ff08b74df68a4e9ec9b1461c45e',
    expireDate: '2027-12-31T23:59:59.000Z',
    device: 'Android phone',
    active: true,
    lastSeen: 'Active now',
  },
  {
    id: 'child-002',
    parentId: 'parent-001',
    username: 'maliha-02',
    email: 'maliha@safetly.test',
    passwordHash:
      '9ee10c28c5fb6d174bf48c70b763a513:c5d0de2c0500e5c293229c2ad9010266ba5c06dcea2e2b7a04810f9d3e5bffb7659a92e322f9357261e8edf0c560de62989a8ff08b74df68a4e9ec9b1461c45e',
    expireDate: '2020-01-01T00:00:00.000Z',
    device: 'iPhone',
    active: false,
    lastSeen: 'Last active 18 min ago',
  },
  {
    id: 'child-003',
    parentId: 'parent-001',
    username: 'rafi-03',
    email: 'rafi@safetly.test',
    passwordHash:
      '9ee10c28c5fb6d174bf48c70b763a513:c5d0de2c0500e5c293229c2ad9010266ba5c06dcea2e2b7a04810f9d3e5bffb7659a92e322f9357261e8edf0c560de62989a8ff08b74df68a4e9ec9b1461c45e',
    expireDate: '2027-06-30T23:59:59.000Z',
    device: 'Android tablet',
    active: true,
    lastSeen: 'Active now',
  },
];

function secret() {
  return process.env.AUTH_SECRET ?? 'safetly-demo-secret-change-me';
}
function encode(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString('base64url');
}

export function verifyPassword(password: string, stored: string) {
  const [salt, expected] = stored.split(':');
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64).toString('hex');
  return timingSafeEqual(
    Buffer.from(actual, 'hex'),
    Buffer.from(expected, 'hex')
  );
}

export function createToken(payload: {
  sub: string;
  role: 'parent' | 'child';
}) {
  const body = encode({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  });
  const signature = createHmac('sha256', secret())
    .update(body)
    .digest('base64url');
  return `${body}.${signature}`;
}

export function readToken(value: string | null) {
  if (!value?.startsWith('Bearer ')) return null;
  const token = value.slice(7);
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;
  const expected = createHmac('sha256', secret())
    .update(body)
    .digest('base64url');
  if (signature !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as {
      sub: string;
      role: 'parent' | 'child';
      exp: number;
    };
    return payload.exp > Math.floor(Date.now() / 1000) ? payload : null;
  } catch {
    return null;
  }
}

export function isPremium(expireDate: string) {
  return new Date(expireDate).getTime() > Date.now();
}
export function publicChild(child: Child) {
  return {
    id: child.id,
    username: child.username,
    email: child.email,
    expireDate: child.expireDate,
    isPremium: isPremium(child.expireDate),
    device: child.device,
    active: child.active,
    lastSeen: child.lastSeen,
  };
}
