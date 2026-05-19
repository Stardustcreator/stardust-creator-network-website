const BASE = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message ?? 'Something went wrong. Please try again.');
  }

  return data as T;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
}

export function getMyProfile() {
  return request<UserProfile>('/users/profile/me');
}

export function getUserById(id: string) {
  return request<UserProfile>(`/users/${id}`);
}

export function updateUser(id: string, data: Partial<Omit<UserProfile, 'id' | 'email'>>) {
  return request<UserProfile>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
