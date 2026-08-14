type BackendJsonInit = Omit<RequestInit, "cache"> & {
  cache?: RequestCache;
};

function getBackendBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_BACKEND_API_URL ??
    "http://127.0.0.1:4010"
  );
}

export async function fetchBackendJson<T>(
  path: string,
  init?: BackendJsonInit,
): Promise<T> {
  const response = await fetch(new URL(path, getBackendBaseUrl()), {
    ...init,
    cache: init?.cache ?? "no-store",
    headers: {
      accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Backend request failed for ${path} with status ${response.status}`);
  }

  return (await response.json()) as T;
}
