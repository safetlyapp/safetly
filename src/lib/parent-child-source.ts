type ExternalRequest = {
  method?: 'GET' | 'POST' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
};

export async function requestParentChildApi(
  path: string,
  request: ExternalRequest = {}
) {
  const baseUrl = process.env.PARENT_CHILD_API_URL?.trim();
  if (!baseUrl) {
    if (process.env.NODE_ENV === 'production') return null;
    return requestDemoParentChildApi(path, request);
  }

  try {
    const response = await fetch(new URL(path, baseUrl), {
      method: request.method ?? 'GET',
      headers: {
        Accept: 'application/json',
        ...(request.body ? { 'Content-Type': 'application/json' } : {}),
        ...(request.headers ?? {}),
      },
      body: request.body ? JSON.stringify(request.body) : undefined,
      cache: 'no-store',
    });
    const payload = await response
      .json()
      .catch(() => ({ error: 'External API returned invalid JSON.' }));
    return { status: response.status, payload };
  } catch {
    return {
      status: 503,
      payload: { error: 'Parent/child API is unavailable.' },
    };
  }
}
import { requestDemoParentChildApi } from '@/lib/parent-child-demo';
