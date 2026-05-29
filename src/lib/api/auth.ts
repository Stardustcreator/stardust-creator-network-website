const BASE = process.env.NEXT_PUBLIC_API_URL;

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const setCookie = res.headers.get('set-cookie');
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message ?? 'Something went wrong. Please try again.');
  }

  return data as T;
}

export function initiateRegistration(email: string, firstName: string, lastName: string) {
  return post<void>('/auth/initiate-registration', { email, firstName, lastName });
}

export function verifyEmail(email: string, code: string) {
  return post<{ registrationToken: string }>('/auth/verify-email', { email, code });
}

export function completeRegistration(
  registrationToken: string,
  password: string,
  tosAccepted: boolean
) {
  return post<void>('/auth/complete-registration', { registrationToken, password, tosAccepted });
}

export function resendVerification(email: string) {
  return post<void>('/auth/resend-verification', { email });
}

export function forgotPassword(email: string) {
  return post<void>('/auth/forgot-password', { email });
}

export function verifyResetOtp(email: string, code: string) {
  return post<{ resetToken: string }>('/auth/verify-reset-otp', { email, code });
}

export function resetPassword(resetToken: string, newPassword: string) {
  return post<void>('/auth/reset-password', { resetToken, newPassword });
}

export function login(email: string, password: string) {
  return post<void>('/auth/login', { email, password });
}

export function initiateGoogleAuth(billing?: 'annual' | 'monthly') {
  if (billing) sessionStorage.setItem('scn_billing', billing);
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
}

export function refreshSession() {
  return post<void>('/auth/refresh', {});
}
