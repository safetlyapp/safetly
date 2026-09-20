import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

type DemoParent = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  childIds: string[];
};

type DemoChild = {
  id: string;
  username: string;
  email: string;
  name: string;
  passwordHash: string;
  salt: string;
  parentId: string;
  expireDate: string;
};

const parents: DemoParent[] = [
  {
    id: 'demo-parent-001',
    name: 'Demo Parent',
    email: 'parent@Seftly.test',
    salt: 'safetly-demo-parent',
    passwordHash:
      '8998c32d99f28796f88072f5f42c6b05f3bc59b0fd0fbcaa7f1cbc91972df6d2c2cbe77a616671047d81e56f4a7b1be0549402aa25ce43ac8b41a1c3bd4f8ffb',
    childIds: ['demo-child-001', 'demo-child-002'],
  },
];

const children: DemoChild[] = [
  {
    id: 'demo-child-001',
    username: 'ayan-01',
    email: 'ayan.demo@Seftly.test',
    name: 'Ayan Demo',
    salt: 'safetly-demo-kid',
    passwordHash:
      '504b08e2eeb64c77c389bcba68c752a48550539cd22d34525f4c1e40f0f4fad1725c661cb4a288755968ef99d26e88043227f326dd91b84fc8630feae3010e88',
    parentId: 'demo-parent-001',
    expireDate: '2027-12-31',
  },
  {
    id: 'demo-child-002',
    username: 'mira-02',
    email: 'mira.demo@Seftly.test',
    name: 'Mira Demo',
    salt: 'safetly-demo-kid',
    passwordHash:
      '504b08e2eeb64c77c389bcba68c752a48550539cd22d34525f4c1e40f0f4fad1725c661cb4a288755968ef99d26e88043227f326dd91b84fc8630feae3010e88',
    parentId: 'demo-parent-001',
    expireDate: '2027-06-30',
  },
];

function verifyPassword(password: unknown, salt: string, expected: string) {
  if (typeof password !== 'string') return false;
  const actual = scryptSync(password, salt, 64);
  const hash = Buffer.from(expected, 'hex');
  return actual.length === hash.length && timingSafeEqual(actual, hash);
}

function premiumStatus(expireDate: string) {
  const expiresAt = new Date(`${expireDate}T23:59:59.999Z`).getTime();
  const isPremium = expiresAt >= Date.now();
  return {
    expireDate,
    isPremium,
    daysRemaining: Math.max(
      0,
      Math.ceil((expiresAt - Date.now()) / 86_400_000)
    ),
  };
}

function publicChild(child: DemoChild) {
  return {
    id: child.id,
    name: child.name,
    username: child.username,
    email: child.email,
    device: 'Android device',
    active: true,
    lastSeen: 'Online now',
    ...premiumStatus(child.expireDate),
  };
}

function findChild(identifier: string) {
  const value = identifier.trim().toLowerCase();
  return children.find(
    (child) =>
      child.username.toLowerCase() === value || child.email.toLowerCase() === value
  );
}

export function requestDemoParentChildApi(
  path: string,
  request: { method?: string; headers?: Record<string, string>; body?: unknown } = {}
) {
  const body = (request.body ?? {}) as Record<string, unknown>;
  const authorization = request.headers?.Authorization ?? '';
  const token = authorization.replace(/^Bearer\s+/i, '');

  if (path === '/api/parent/login' && request.method === 'POST') {
    const parent = parents.find(
      (item) => item.email.toLowerCase() === String(body.email ?? '').toLowerCase()
    );
    if (!parent || !verifyPassword(body.password, parent.salt, parent.passwordHash)) {
      return { status: 401, payload: { error: 'Invalid parent email or password.' } };
    }
    return {
      status: 200,
      payload: {
        token: `demo-parent-${randomBytes(8).toString('hex')}`,
        profile: { id: parent.id, name: parent.name, email: parent.email },
      },
    };
  }

  if (path === '/api/child/login' && request.method === 'POST') {
    const child = findChild(String(body.identifier ?? ''));
    if (!child || !verifyPassword(body.password, child.salt, child.passwordHash)) {
      return { status: 401, payload: { error: 'Invalid child username or password.' } };
    }
    return {
      status: 200,
      payload: {
        token: `demo-child-${randomBytes(8).toString('hex')}`,
        profile: {
          id: child.id,
          name: child.name,
          username: child.username,
          email: child.email,
        },
      },
    };
  }

  if (path === '/api/parent/children' || path === '/api/parent/childs') {
    if (!token.startsWith('demo-parent-')) {
      return { status: 401, payload: { error: 'Parent authentication required.' } };
    }
    const parent = parents[0];
    const parentChildren = children
      .filter((child) => parent.childIds.includes(child.id))
      .map(publicChild);
    return {
      status: 200,
      payload: {
        parent: { id: parent.id, name: parent.name, email: parent.email },
        children: parentChildren,
        total: parentChildren.length,
        summary: {
          totalChildren: parentChildren.length,
          activeChildren: parentChildren.filter((child) => child.active).length,
        },
      },
    };
  }

  if (path.startsWith('/api/child/lookup')) {
    const identifier = new URL(path, 'http://demo.local').searchParams.get('identifier') ?? '';
    const child = findChild(identifier);
    if (!child) return { status: 404, payload: { valid: false, error: 'Child not found.' } };
    return { status: 200, payload: { valid: true, user: publicChild(child) } };
  }

  if (path === '/api/child/dashboard') {
    const child = children[0];
    return {
      status: 200,
      payload: {
        profile: { id: child.id, name: child.name, username: child.username, email: child.email },
        device: { active: true, status: 'Active', message: 'Demo device is connected.' },
        premium: premiumStatus(child.expireDate),
      },
    };
  }

  return { status: 404, payload: { error: 'Demo endpoint not found.' } };
}
