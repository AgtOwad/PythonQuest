import type { OnboardingPreferences, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

interface RawSessionResponse {
  token: string;
  user: User;
}

interface ProgressPayload {
  user_id: string;
  lesson_id: string;
  status: string;
  xp_earned: number;
  gems_earned: number;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    ...options,
    headers,
  });

  let payload: unknown = null;
  if (response.status !== 204) {
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    const body = typeof payload === 'object' && payload !== null ? (payload as Record<string, unknown>) : null;
    const detailSource = body?.detail ?? body?.message;
    const detail = typeof detailSource === 'string' ? detailSource : null;
    throw new Error(detail ?? 'Request failed. Please try again.');
  }

  return payload as T;
}

function mapSession(response: RawSessionResponse): RawSessionResponse {
  return {
    token: response.token,
    user: response.user,
  };
}

export async function submitOnboardingPreferences(preferences: OnboardingPreferences): Promise<void> {
  await request('/onboarding/preferences', {
    method: 'POST',
    body: JSON.stringify(preferences),
  });
}

export async function signup(payload: { name: string; email: string; password: string }): Promise<RawSessionResponse> {
  const response = await request<RawSessionResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return mapSession(response);
}

export async function login(payload: { email: string; password: string }): Promise<RawSessionResponse> {
  const response = await request<RawSessionResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return mapSession(response);
}

export async function fetchSession(token: string): Promise<RawSessionResponse> {
  const response = await request<RawSessionResponse>('/auth/session', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return mapSession(response);
}

export async function requestPasswordReset(email: string): Promise<void> {
  await request('/auth/reset', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function recordLessonProgress(token: string, payload: ProgressPayload): Promise<void> {
  await request('/progress', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export type { ProgressPayload };
